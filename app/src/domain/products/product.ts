import {ProductType} from './product-type-enum.ts';
import {ProductRateType} from './product-rate-type-enum.ts';
import {Map, fromJS} from 'immutable';

export class Product {
  constructor(
    public Type:ProductType,
    public Rates: Map<ProductRateType, any>
  ){};
}
