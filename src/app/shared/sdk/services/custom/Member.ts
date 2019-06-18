/* tslint:disable */
import {Injectable, Inject, Optional} from '@angular/core';
import {Http, Response} from '@angular/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackConfig} from '../../lb.config';
import {LoopBackAuth} from '../core/auth.service';
import {LoopBackFilter, SDKToken, AccessToken} from '../../models/BaseModels';
import {JSONSearchParams} from '../core/search.params';
import {ErrorHandler} from '../core/error.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import {Member} from '../../models/Member';
import {SocketConnection} from '../../sockets/socket.connections';
import {Deal} from '../../models/Deal';


/**
 * Api services for the `Member` model.
 */
@Injectable()
export class MemberApi extends BaseLoopBackApi {

  constructor(@Inject(Http) protected http: Http,
              @Inject(SocketConnection) protected connection: SocketConnection,
              @Inject(SDKModels) protected models: SDKModels,
              @Inject(LoopBackAuth) protected auth: LoopBackAuth,
              @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
              @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
    super(http, connection, models, auth, searchParams, errorHandler);
  }

  /**
   * Login a user with useremail/password pair or social network account info (accessToken, userId, provider)
   *
   * @param {string} include Related objects to include in the response. See the description of return value for more details.
   *
   * @param {number} force
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The response body contains properties of the AccessToken created on login.
   * Depending on the value of `include` parameter, the body may contain additional properties:
   *
   *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
   *
   *
   */
  public processLogin(credentials: any, include: any = {}, force: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/login';
    let _routeParams: any = {};
    let _postBody: any = {
      credentials: credentials
    };
    let _urlParams: any = {};
    if (typeof include !== 'undefined' && include !== null) _urlParams.include = include;
    if (typeof force !== 'undefined' && force !== null) _urlParams.force = force;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.map(
      (response: any) => {
        response.ttl = parseInt(response.data.ttl);
        response.rememberMe = 1;
        this.auth.setToken(response.data);
        return response;
      }
    );
  }

  /**
   * Creates a new instance in deals of this model.
   *
   * @param {any} id Member id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public createDeals(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/deals';
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
   * Counts deals of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public countDeals(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/deals/count';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Creates a new instance in feedback of this model.
   *
   * @param {any} id Member id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public createFeedback(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/feedback';
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
   * Counts feedback of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public countFeedback(id: any, where: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/feedbacks/count';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof where !== 'undefined' && where !== null) _urlParams.where = where;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Counts feedback of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public countRequests(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/requests/count';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Counts orders of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public countOrders(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/orders/count';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get feedback of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public getFeedBack(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/feedbacks';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get current of Member.
   *
   * @param {any} id Member id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public me(customHeaders?: Function): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/me';
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Logout a user with access token.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public logout(customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/logout';
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    _urlParams.access_token = this.auth.getAccessTokenId();
    this.auth.clear();
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Choose Favourites Categories
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public chooseCategories(data: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/categories/choose?access_token=' + this.auth.getAccessTokenId();
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Choose Favourites Categories
   *
   * @param {any} id User Id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public updateProfile(id: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id';
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
   * Update user become to shipper
   *
   * @param {any} id User Id
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public becomeShipper(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = 'PATCH';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/shipper';
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Creates a new instance in deals of this model.
   *
   * @param {any} id Member id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public createManyDeals(id: any, data: any[] = [], customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/deals';
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
   * Creates a new instance in feedback of this model.
   *
   * @param {any} id Member id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Member` object.)
   * </em>
   */
  public createManyFeedback(id: any, data: any[] = [], customHeaders?: Function): Observable<any> {
    let _method: string = 'POST';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() +
      '/Members/:id/feedback';
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
   * @ngdoc method
   * @name sdk.Member#getCurrent
   * @methodOf sdk.Member
   *
   * @description
   *
   * Get data of the currently logged user. Fail with HTTP result 401
   * when there is no user logged in.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   */
  public getCurrent(filter: LoopBackFilter = {}): Observable<any> {
    let _method: string = 'GET';
    let _url: string = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() + '/Members' + '/:id';
    let id: any = this.auth.getCurrentUserId();
    if (id == null)
      id = '__anonymous__';
    let _routeParams: any = {id: id};
    let _urlParams: any = {};
    let _postBody: any = {};
    if (filter) _urlParams.filter = filter;
    return this.request(_method, _url, _routeParams, _urlParams, _postBody);
  }

  /**
   * Get data of the currently logged user that was returned by the last
   * call to {@link sdk.Member#login} or
   * {@link sdk.Member#getCurrent}. Return null when there
   * is no user logged in or the data of the current user were not fetched
   * yet.
   *
   * @returns object An Account instance.
   */
  public getCachedCurrent() {
    return this.auth.getCurrentUserData();
  }

  /**
   * Get data of the currently logged access tokern that was returned by the last
   * call to {@link sdk.Member#login}
   *
   * @returns object An AccessToken instance.
   */
  public getCurrentToken(): AccessToken {
    return this.auth.getToken();
  }

  /**
   * @name sdk.Member#isAuthenticated
   *
   * @returns {boolean} True if the current user is authenticated (logged in).
   */
  public isAuthenticated() {
    return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
  }

  /**
   * @name sdk.Member#getCurrentId
   *
   * @returns object Id of the currently logged-in user or null.
   */
  public getCurrentId() {
    return this.auth.getCurrentUserId();
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public getModelName() {
    return 'Member';
  }
}
