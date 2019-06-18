import {RouterModule, Routes} from '@angular/router';
import {DealComponent} from './deal.component';
import {DealDetailComponent} from './deal-detail/deal-detail.component';

const DEAL_ROUTER: Routes = [
  {
    path: '',
    component: DealComponent
  },
  {
    path: ':id',
    component: DealDetailComponent
  }
];

export const dealRouter = RouterModule.forChild(DEAL_ROUTER);
