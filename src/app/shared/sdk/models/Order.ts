/* tslint:disable */

declare var Object: any;

export interface OrderInterface {
  'requester'?: any;
  'shipper'?: any;
  'title': string;
  'productPrice': number;
  'shippingPrice': number;
  'spend'?: number;
  'status'?: string;
  'reason'?: string;
  'item'?: any;
  'id'?: any;
  'created'?: Date;
  'modified'?: Date;
}

export class Order implements OrderInterface {
  'requester': any;
  'shipper': any;
  'title': string;
  'productPrice': number;
  'shippingPrice': number;
  'spend': number;
  'status': string;
  'reason': string;
  'item': any;
  'id': any;
  'created': Date;
  'modified': Date;

  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return 'Order';
  }

  /**
   * @method factory
   * @author Jonathan Casarrubias
   * @license MIT
   * This method creates an instance of Order for dynamic purposes.
   **/
  public static factory(data: OrderInterface): Order {
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        'requester': {
          name: 'requester',
          type: 'any'
        },
        'shipper': {
          name: 'shipper',
          type: 'any'
        },
        'title': {
          name: 'title',
          type: 'string'
        },
        'productPrice': {
          name: 'productPrice',
          type: 'number'
        },
        'shippingPrice': {
          name: 'shippingPrice',
          type: 'number'
        },
        'spend': {
          name: 'spend',
          type: 'number'
        },
        'status': {
          name: 'status',
          type: 'string',
          default: 'pending'
        },
        'reason': {
          name: 'reason',
          type: 'string'
        },
        'item': {
          name: 'item',
          type: 'any',
          default: <any>null
        },
        'id': {
          name: 'id',
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
      relations: {}
    }
  }
}
