import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent,
    children: [
            { path: '', component: WeatherComponent },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
