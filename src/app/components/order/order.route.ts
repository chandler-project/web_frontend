import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {OrderPaymentComponent} from './order-payment/order-payment.component';

const ORDER_ROUTERS: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: ':id/make-payment',
    component: OrderPaymentComponent
  },
  {
    path: 'checkout',
    component: OrderPaymentComponent
  }
];

export const orderRouter = RouterModule.forChild(ORDER_ROUTERS);
