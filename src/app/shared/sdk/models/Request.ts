/* tslint:disable */

declare var Object: any;

export interface RequestInterface {
  'productName': string;
  'reference': string;
  'productPics'?: Array<any>;
  'price': number;
  'description'?: string;
  'budget': any;
  'currency'?: string;
  'deadline': string;
  'address': string;
  'bidders'?: Array<any>;
  'amount'?: number;
  'owner'?: any;
  'choosen'?: any;
  'id'?: any;
  'status'?: any;
  'categoryId'?: any;
  'created'?: Date;
  'modified'?: Date;
  category?: any;
}

export class Request implements RequestInterface {
  'productName': string;
  'reference': string;
  'productPics': Array<any>;
  'price': number;
  'description': string;
  'budget': any;
  'currency': string;
  'deadline': string;
  'address': string;
  'bidders': Array<any>;
  'amount': number;
  'status': string;
  'choosen': any;
  'owner': any;
  'category': any;
  'id': any;
  'categoryId': any;
  'created': Date;
  'modified': Date;

  constructor(data?: RequestInterface) {
    Object.assign(this, data);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Request`.
   */
  public static getModelName() {
    return 'Request';
  }

  /**
   * @method factory
   * @author Jonathan Casarrubias
   * @license MIT
   * This method creates an instance of Request for dynamic purposes.
   **/
  public static factory(data: RequestInterface): Request {
    return new Request(data);
  }

  /**
   * @method getModelDefinition
   * @author Julien Ledun
   * @license MIT
   * This method returns an object that represents some of the model
   * definitions.
   **/
  public static getModelDefinition() {
    return {
      name: 'Request',
      plural: 'Requests',
      path: 'Requests',
      idName: 'id',
      properties: {
        'productName': {
          name: 'productName',
          type: 'string'
        },
        'reference': {
          name: 'reference',
          type: 'string'
        },
        'productPics': {
          name: 'productPics',
          type: 'Array&lt;any&gt;'
        },
        'price': {
          name: 'price',
          type: 'number'
        },
        'description': {
          name: 'description',
          type: 'string'
        },
        'budget': {
          name: 'budget',
          type: 'any',
          default: <any>null
        },
        'currency': {
          name: 'currency',
          type: 'string',
          default: 'VND'
        },
        'deadline': {
          name: 'deadline',
          type: 'string'
        },
        'address': {
          name: 'address',
          type: 'string'
        },
        'bidders': {
          name: 'bidders',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        'amount': {
          name: 'amount',
          type: 'number',
          default: 1
        },
        'owner': {
          name: 'owner',
          type: 'any'
        },
        'category': {
          name: 'category',
          type: 'any'
        },
        'id': {
          name: 'id',
          type: 'any'
        },
        'categoryId': {
          name: 'categoryId',
          type: 'any'
        },
        'created': {
          name: 'created',
          type: 'Date',
          default: new Date(0)
        },
        'modified': {
          name: 'modified',
          type: 'Date',
          default: new Date(0)
        },
      },
      relations: {
        category: {
          name: 'category',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
          keyFrom: 'categoryId',
          keyTo: 'id'
        },
      }
    }
  }
}
