import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { ServiceProvider } from '../services/service-provider';
import {Subscription, timer} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  timerSubscription: Subscription;

  cityIdArray: any[] = [];
  groupIds: any;
  changeIndex: any;

  weatherPanels: any[] = [
    {
      groupId: null, id: 0, name: 'panel-1', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 1, name: 'panel-2', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 2, name: 'panel-3', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 3, name: 'panel-4', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 4, name: 'panel-5', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 5, name: 'panel-6', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 6, name: 'panel-7', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 7, name: 'panel-8', value: null, weather: {temp: null, main: null}
    },
    {
      groupId: null, id: 8, name: 'panel-9', value: null, weather: {temp: null, main: null}
    },
  ]

  weatherForm!: FormGroup;

  weatherInfo: any;

  cityName: string | null = null


  constructor(private toastr: ToastrService, private serviceProvider: ServiceProvider, private fb: FormBuilder) {
    this.addWeatherFormControls()
    this.timerSubscription = timer(0, 30000).pipe(
      map(() => {
        this.loadData();
      })
    ).subscribe();
  }

  ngOnInit(): void {
    let localData = JSON.parse(localStorage.getItem("weatherPanels") || '[]')
    debugger
    if(!!localData && localData.length() > 0) {
      this.weatherPanels = localData;
    }

  }

  loadData() {
    this.groupIds = this.cityIdArray.forEach(
      (x) => {
        this.cityName = this.weatherPanels[x].value
        this.getCityWeatherInfo(x)
      }
    )
  }

  get city() {
    return this.weatherForm.get('cityName');
  }

  addWeatherFormControls() {
    this.weatherForm = this.fb.group(
      {
        cityName: ['', Validators.required],
      }
    )
  }



  getCityWeatherInfo(index: number) {
    this.serviceProvider.getWeatherForCity(this.cityName).subscribe(
      result => {
        this.weatherInfo = result;
        let temp = this.weatherInfo?.main?.temp;
      let conditionId = this.weatherInfo?.weather[0]?.id
      let id = this.weatherInfo?.id;
     let condition = this.getConditionByID(conditionId);
     this.cityIdArray.push(index);
      this.weatherPanels.map(
        (obj) => {
          if(obj.id === index) {
            obj.value = this.city?.value;
            obj.weather.temp = temp;
            obj.weather.main = condition;
            obj.groupId = id;
            obj.value = this.weatherInfo?.name
            return obj
          } else {
            return obj
          }
        }
      )
      localStorage.removeItem("weatherPanels");
      localStorage.setItem("weatherPanels", JSON.stringify(this.weatherPanels));
      },
      error => {

        this.toastr.error('No Weather Data Found', error?.statusText);
      });
      this.city?.setValue('')

  }

  getConditionByID(id: any) {
    if(id === 800) {
      return 'clear'
    }
    if(id >= 801 && id <= 900) {
      return 'clouds'
    }
    if(id >= 701 && id <= 799) {
      return 'atmosphere'
    }
    if(id >= 600 && id <= 650) {
      return 'snow'
    }
    if(id >= 500 && id <= 530) {
      return 'rain'
    }
    if(id >= 300 && id <= 321) {
      return 'drizzle'
    }
    if(id >= 200 && id <= 232) {
      return 'thunderstorm'
    }
    return ''
  }



  enterCity(index: number) {

   this.weatherPanels.map(
      (obj) => {
        if(obj.id === index) {
          obj.value = '';
          return obj
        } else {
          return obj
        }
      }
    )
  }

  onSubmit(event: any, index: any) {
    let cityValue = this.city?.value;

    if(!!cityValue) {
      this.cityName = cityValue;

      this.getCityWeatherInfo(index)
    }
    this.changeIndex = null;
  }
  changeCity(index: any) {
    this.changeIndex = index
  }

}
