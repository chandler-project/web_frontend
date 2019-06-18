/* tslint:disable */
import {
  Deal
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "firstName"?: string;
  "lastName"?: string;
  "gender"?: number;
  "dateOfBirth"?: Date;
  "phoneNumber"?: string;
  "address"?: string;
  "bio"?: string;
  "avatar"?: string;
  "invalidAttempts"?: number;
  "lockOutTimeStamp"?: Date;
  "device"?: any;
  "socketId"?: string;
  "lang"?: string;
  "fbAccessToken": string;
  "categories"?: Array<any>;
  "points"?: number;
  "isShipper"?: boolean;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "created"?: Date;
  "modified"?: Date;
  "password"?: string;
  accessTokens?: any[];
  deals?: Deal[];
  feedback?: any[];
}

export class Member implements MemberInterface {
  "firstName": string;
  "lastName": string;
  "gender": number;
  "dateOfBirth": Date;
  "phoneNumber": string;
  "address": string;
  "bio": string;
  "avatar": string;
  "invalidAttempts": number;
  "lockOutTimeStamp": Date;
  "device": any;
  "socketId": string;
  "lang": string;
  "fbAccessToken": string;
  "categories": Array<any>;
  "points": number;
  "isShipper": boolean;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "created": Date;
  "modified": Date;
  "password": string;
  accessTokens: any[];
  deals: Deal[];
  feedback: any[];
  constructor(data?: MemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public static getModelName() {
    return "Member";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Member for dynamic purposes.
  **/
  public static factory(data: MemberInterface): Member{
    return new Member(data);
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
      name: 'Member',
      plural: 'Members',
      path: 'Members',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'number'
        },
        "dateOfBirth": {
          name: 'dateOfBirth',
          type: 'Date'
        },
        "phoneNumber": {
          name: 'phoneNumber',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "bio": {
          name: 'bio',
          type: 'string',
          default: ''
        },
        "avatar": {
          name: 'avatar',
          type: 'string'
        },
        "invalidAttempts": {
          name: 'invalidAttempts',
          type: 'number',
          default: 0
        },
        "lockOutTimeStamp": {
          name: 'lockOutTimeStamp',
          type: 'Date'
        },
        "device": {
          name: 'device',
          type: 'any'
        },
        "socketId": {
          name: 'socketId',
          type: 'string'
        },
        "lang": {
          name: 'lang',
          type: 'string',
          default: 'en'
        },
        "fbAccessToken": {
          name: 'fbAccessToken',
          type: 'string'
        },
        "categories": {
          name: 'categories',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "points": {
          name: 'points',
          type: 'number',
          default: 0
        },
        "isShipper": {
          name: 'isShipper',
          type: 'boolean',
          default: false
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "created": {
          name: 'created',
          type: 'Date',
          default: new Date(0)
        },
        "modified": {
          name: 'modified',
          type: 'Date',
          default: new Date(0)
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        deals: {
          name: 'deals',
          type: 'Deal[]',
          model: 'Deal',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'memberId'
        },
        feedback: {
          name: 'feedback',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'memberId'
        },
      }
    }
  }
}
