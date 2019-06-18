import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/components/home/home.module#HomeModule'
  },
  {
    path: 'cat/:name',
    loadChildren: 'app/components/cat/cat.module#CatModule'
  },
  {
    path: 'trending',
    loadChildren: 'app/components/trending/trending.module#TrendingModule'
  },
  {
    path: 'request',
    loadChildren: 'app/components/request/request.module#RequestModule'
  },
  {
    path: 'deal',
    loadChildren: 'app/components/deal/deal.module#DealModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/components/profile/profile.module#ProfileModule'
  },
  {
    path: 'cart',
    loadChildren: 'app/components/order/order.module#OrderModule'
  },
  {
    path: 'orders',
    loadChildren: 'app/components/order/order.module#OrderModule'
  }
];

export const chandlerRouter: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
