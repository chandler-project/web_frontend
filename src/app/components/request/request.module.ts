import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestComponent} from './request.component';
import {requestRouter} from './request.route';
import {CreateRequestComponent} from './create-request/create-request.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageUploadModule} from 'angular2-image-upload';
import {MomentModule} from 'angular2-moment';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  imports: [
    ImageUploadModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxEditorModule,
    MomentModule,
    FormsModule,
    SharedModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    requestRouter
  ],
  declarations: [
    RequestComponent,
    CreateRequestComponent,
    RequestDetailComponent
  ]
})
export class RequestModule {
}
