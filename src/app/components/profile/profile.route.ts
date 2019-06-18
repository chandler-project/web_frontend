import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfileDealComponent} from './profile-deal/profile-deal.component';
import {ProfileRequestsComponent} from './profile-requests/profile-requests.component';

const PROFILE_ROUTERS: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  },
  {
    path: ':id/deals',
    component: ProfileDealComponent
  },
  {
    path: ':id/requests',
    component: ProfileRequestsComponent
  }
];

export const profileRouter = RouterModule.forChild(PROFILE_ROUTERS);
