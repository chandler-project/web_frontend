import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {profileRouter} from './profile.route';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProfileDealComponent} from './profile-deal/profile-deal.component';
import {ProfileRequestsComponent} from './profile-requests/profile-requests.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    profileRouter
  ],
  declarations: [
    ProfileComponent,
    ProfileDealComponent,
    ProfileRequestsComponent
  ]
})
export class ProfileModule {
}
