import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { WeatherComponent } from './weather/weather.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
