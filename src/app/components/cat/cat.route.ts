import {RouterModule, Routes} from '@angular/router';
import {CatComponent} from './cat.component';

const HOME_ROUTER: Routes = [
  {
    path: '',
    component: CatComponent
  }
];

export const catRouter = RouterModule.forChild(HOME_ROUTER);
