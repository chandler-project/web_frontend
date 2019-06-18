import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {homeRouter} from './home.route';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    homeRouter,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
