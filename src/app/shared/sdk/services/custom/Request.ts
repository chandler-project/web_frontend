/* tslint:disable */
import {Injectable, Inject, Optional} from '@angular/core';
import {Http, Response} from '@angular/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackConfig} from '../../lb.config';
import {LoopBackAuth} from '../core/auth.service';
import {LoopBackFilter,} from '../../models/BaseModels';
import {JSONSearchParams} from '../core/search.params';
import {ErrorHandler} from '../core/error.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import {Request} from '../../models/Request';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `Request` model.
 */
@Injectable()
export class RequestApi extends BaseLoopBackApi {

  constructor(@Inject(Http) protected http: Http,
              @Inject(SocketConnection) protected connection: SocketConnection,
              @Inject(SDKModels) protected models: SDKModels,
              @Inject(LoopBackAuth) protected auth: LoopBackAuth,
              @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
              @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
    super(http, connection, models, auth, searchParams, errorHandler);
  }

  /**
   * Shipper can bid a request
   *
   * @param {string} requestId Request Id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - {price: "", sentence: "", spend: ""}
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Request` object.)
   * </em>
   */
  public bid(requestId: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Requests/:requestId/bid';
    let _routeParams: any = {
      requestId: requestId
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Requester can choose a shipper
   *
   * @param {string} requestId Request Id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - {price: "", sentence: "", spend: ""}
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Request` object.)
   * </em>
   */
  public chooseShipper(requestId: any, shipperId: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Requests/:requestId/:shipperId/choose';
    let _routeParams: any = {
      requestId: requestId,
      shipperId: shipperId
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get New Feeds
   *
   * @param {object} options
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Request` object.)
   * </em>
   */
  public newFeeds(customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Requests/new-feeds';
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Request`.
   */
  public getModelName() {
    return 'Request';
  }
}
