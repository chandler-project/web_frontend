/* tslint:disable */
import {
  Deal,
  Request
} from '../index';

declare var Object: any;

export interface CategoryInterface {
  'name': string;
  'slug': string;
  'description': string;
  'picture': string;
  'icon': string;
  'id'?: any;
  deals?: Deal[];
  requests?: Request[];
}

export class Category implements CategoryInterface {
  'name': string;
  'slug': string;
  'description': string;
  'picture': string;
  'icon': string;
  'id': any;
  deals: Deal[];
  requests: Request[];

  constructor(data?: CategoryInterface) {
    Object.assign(this, data);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public static getModelName() {
    return 'Category';
  }

  /**
   * @method factory
   * @author Jonathan Casarrubias
   * @license MIT
   * This method creates an instance of Category for dynamic purposes.
   **/
  public static factory(data: CategoryInterface): Category {
    return new Category(data);
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
      name: 'Category',
      plural: 'Categories',
      path: 'Categories',
      idName: 'id',
      properties: {
        'name': {
          name: 'name',
          type: 'string'
        },
        'slug': {
          name: 'slug',
          type: 'string'
        },
        'description': {
          name: 'description',
          type: 'string'
        },
        'picture': {
          name: 'picture',
          type: 'string'
        },
        'icon': {
          name: 'icon',
          type: 'string'
        },
        'id': {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        deals: {
          name: 'deals',
          type: 'Deal[]',
          model: 'Deal',
          relationType: 'hasMany',
          keyFrom: 'id',
          keyTo: 'categoryId'
        },
        requests: {
          name: 'requests',
          type: 'Request[]',
          model: 'Request',
          relationType: 'hasMany',
          keyFrom: 'id',
          keyTo: 'categoryId'
        },
      }
    }
  }
}
