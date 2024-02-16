import { Injectable, computed, signal } from '@angular/core';
import { ApiService, IProduct } from '../../product-list/product-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<IProduct[]>([]);
  public subTotal = computed(() => this.cartItems().reduce((prev: any, curr: IProduct) => {
    return prev + curr.price;
  }, 0));
  public totalItems = computed(() => this.cartItems().length);

  constructor(private api: ApiService) {

  }

  addProductSignal(product: IProduct) {
    this.cartItems.update(() => {
      return [product]
    });
    this.api.products()?.forEach(a => {
      if (a.id === product.id) {
        a.rating.count = a.rating.count - 1;
      }
    })
  }

  removeProductSignal(id: number) {
    this.cartItems.update(val => {
      const product = val.splice(id, 1);
      this.api.products()?.filter(obj => {
        if (obj.id === product[0].id) {
          obj.rating.count = obj.rating.count + 1;
        }
      });
      return val;
    });

  }
}
