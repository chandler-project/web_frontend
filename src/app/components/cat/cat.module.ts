import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatComponent} from './cat.component';
import {catRouter} from './cat.route';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    catRouter,
    SharedModule
  ],
  declarations: [
    CatComponent,
  ]
})
export class CatModule {
}
