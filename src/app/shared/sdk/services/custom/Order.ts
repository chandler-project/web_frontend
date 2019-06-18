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
import {Order} from '../../models/Order';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `Order` model.
 */
@Injectable()
export class OrderApi extends BaseLoopBackApi {

  constructor(@Inject(Http) protected http: Http,
              @Inject(SocketConnection) protected connection: SocketConnection,
              @Inject(SDKModels) protected models: SDKModels,
              @Inject(LoopBackAuth) protected auth: LoopBackAuth,
              @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
              @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
    super(http, connection, models, auth, searchParams, errorHandler);
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public patchOrCreate(data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders';
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public patchAttributes(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public payAll(data: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/pay';
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public addPayment(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/payments';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public acceptOrder(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/accepted';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public confirmOrder(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/confirmed';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public rejectOrder(id: any, reason: string, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/rejected';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      'reason': reason
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public deniedOrder(id: any, reason: string, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/denied';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      'reason': reason
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public countAllPendingOrders(customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/pendings/count';
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public getAllPendingOrders(customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/pendings';
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public deliveredOrder(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/delivered';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Order id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Order` object.)
   * </em>
   */
  public disclaimerOrder(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Orders/:id/disclaimer';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public getModelName() {
    return 'Order';
  }
}
