/* tslint:disable */
import {
  Category
} from '../index';

declare var Object: any;

export interface DealInterface {
  'productName': string;
  'reference': string;
  'price': number;
  'shippingPrice': number;
  'currency': string;
  'shippingTime': string;
  'deadline': string;
  'productDesc'?: string;
  'productPics'?: Array<any>;
  'shipper'?: any;
  'requesters'?: Array<any>;
  'upVoters'?: Array<any>;
  'downVoters'?: Array<any>;
  'upvote'?: number;
  'downvote'?: number;
  'noOfComments'?: number;
  'id'?: any;
  'memberId'?: any;
  'created'?: Date;
  'modified'?: Date;
  'categoryId'?: any;
  category?: Category;
  comments?: any[];
}

export class Deal implements DealInterface {
  'productName': string;
  'reference': string;
  'price': number;
  'shippingPrice': number;
  'currency': string;
  'shippingTime': string;
  'deadline': string;
  'productDesc': string;
  'productPics': Array<any>;
  'shipper': any;
  'requesters': Array<any>;
  'upVoters': Array<any>;
  'downVoters': Array<any>;
  'upvote': number;
  'downvote': number;
  'noOfComments': number;
  'id': any;
  'memberId': any;
  'created': Date;
  'modified': Date;
  'categoryId': any;
  category: Category;
  comments: any[];

  constructor(data?: DealInterface) {
    Object.assign(this, data);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Deal`.
   */
  public static getModelName() {
    return 'Deal';
  }

  /**
   * @method factory
   * @author Jonathan Casarrubias
   * @license MIT
   * This method creates an instance of Deal for dynamic purposes.
   **/
  public static factory(data: DealInterface): Deal {
    return new Deal(data);
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
      name: 'Deal',
      plural: 'Deals',
      path: 'Deals',
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
        'price': {
          name: 'price',
          type: 'number'
        },
        'shippingPrice': {
          name: 'shippingPrice',
          type: 'number'
        },
        'currency': {
          name: 'currency',
          type: 'string',
          default: 'USD'
        },
        'shippingTime': {
          name: 'shippingTime',
          type: 'string'
        },
        'productDesc': {
          name: 'productDesc',
          type: 'string'
        },
        'productPics': {
          name: 'productPics',
          type: 'Array&lt;any&gt;'
        },
        'shipper': {
          name: 'shipper',
          type: 'any'
        },
        'requesters': {
          name: 'requesters',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        'upVoters': {
          name: 'upVoters',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        'downVoters': {
          name: 'downVoters',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        'upvote': {
          name: 'upvote',
          type: 'number',
          default: 0
        },
        'downvote': {
          name: 'downvote',
          type: 'number',
          default: 0
        },
        'noOfComments': {
          name: 'noOfComments',
          type: 'number',
          default: 0
        },
        'id': {
          name: 'id',
          type: 'any'
        },
        'memberId': {
          name: 'memberId',
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
        'categoryId': {
          name: 'categoryId',
          type: 'any'
        },
      },
      relations: {
        category: {
          name: 'category',
          type: 'Category',
          model: 'Category',
          relationType: 'belongsTo',
          keyFrom: 'categoryId',
          keyTo: 'id'
        },
        comments: {
          name: 'comments',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          keyFrom: 'id',
          keyTo: 'dealId'
        },
      }
    }
  }
}
