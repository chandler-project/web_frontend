import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {LoopBackConfig} from '../shared/sdk';
import {LoopBackAuth} from '../shared/sdk/services/core';

@Injectable()
export class UploadService {

  constructor(private authService: LoopBackAuth) {
  }

  public upload(formData: FormData): Observable<any> {
    return Observable.create(observer => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
        '/Uploads/chandler/upload';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', _url, true);
      xhr.setRequestHeader('Authorization', this.authService.getAccessTokenId());
      xhr.send(formData);
    });
  }
}

