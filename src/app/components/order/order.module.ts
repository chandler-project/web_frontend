import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {OrderComponent} from './order.component';
import {orderRouter} from './order.route';
import {OrderPaymentComponent} from './order-payment/order-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {RatingModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD59deEdmjlXpTVk6WYPV1Hfbiu2a0yVZs',
      libraries: ['places']
    }),
    RatingModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    orderRouter
  ],
  declarations: [
    OrderComponent,
    OrderPaymentComponent
  ]
})
export class OrderModule {
}
