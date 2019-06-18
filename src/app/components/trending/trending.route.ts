import {RouterModule, Routes} from '@angular/router';
import {TrendingComponent} from './trending.component';

const REQUEST_ROUTER: Routes = [
  {
    path: '',
    component: TrendingComponent
  }
];

export const trendingRoute = RouterModule.forChild(REQUEST_ROUTER);
