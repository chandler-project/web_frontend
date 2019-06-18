import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrendingComponent} from './trending.component';
import {trendingRoute} from './trending.route';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    trendingRoute,
    SharedModule
  ],
  declarations: [
    TrendingComponent
  ]
})
export class TrendingModule {
}
