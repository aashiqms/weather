import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProvider {

  apiKey: string = "a386a70ed53cfbd84c0e1125d08aed28";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
 }

  getWeatherForCity(cityName: any): Observable<any> {
    let serviceUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'4d8fb5b93d4af21d66a2948710284366'}&units=metric`;
    return this.httpClient.get<any>(serviceUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }


}
