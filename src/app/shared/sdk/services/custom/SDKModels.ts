/* tslint:disable */
import { Injectable } from '@angular/core';
import { Member } from '../../models/Member';
import { Deal } from '../../models/Deal';
import { Category } from '../../models/Category';
import { Upload } from '../../models/Upload';
import { Request } from '../../models/Request';
import { Order } from '../../models/Order';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Member: Member,
    Deal: Deal,
    Category: Category,
    Upload: Upload,
    Request: Request,
    Order: Order,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
