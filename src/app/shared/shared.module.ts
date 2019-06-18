import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DealFooterComponent} from '../components/deal/deal-footer/deal-footer.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {BackgroundImageDirective} from '../directives/background-image.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    DealFooterComponent,
    BackgroundImageDirective,
  ],
  providers: [],
  exports: [
    DealFooterComponent,
    BackgroundImageDirective
  ]
})
export class SharedModule {
}
