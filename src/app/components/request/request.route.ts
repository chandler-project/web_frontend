import {RouterModule, Routes} from '@angular/router';
import {RequestComponent} from './request.component';
import {CreateRequestComponent} from './create-request/create-request.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';

const REQUEST_ROUTER: Routes = [
  {
    path: '',
    component: RequestComponent
  },
  {
    path: 'create',
    component: CreateRequestComponent
  },
  {
    path: ':id',
    component: RequestDetailComponent
  }
];

export const requestRouter = RouterModule.forChild(REQUEST_ROUTER);
