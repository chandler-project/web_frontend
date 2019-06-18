import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedService {
  private dataObs$ = new Subject<any>();

  getData() {
    return this.dataObs$;
  }

  updateData(key: string, data: boolean) {
    this.dataObs$.next({
      key: key,
      value: data
    });
  }
}
