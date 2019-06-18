import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DealComponent} from './deal.component';
import {dealRouter} from './deal.route';
import {DealDetailComponent} from './deal-detail/deal-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {ImageUploadModule} from 'angular2-image-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BackgroundImageDirective} from '../../directives/background-image.directive';
import {NgxEditorModule} from 'ngx-editor';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {CurrencyMaskModule} from 'ngx-currency-mask';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    ImageUploadModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    MomentModule,
    NgxEditorModule,
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    dealRouter
  ],
  declarations: [
    DealComponent,
    DealDetailComponent
  ]
})
export class DealModule {
}
