import { Component, OnInit } from '@angular/core';
import { CartService } from './cart-service/cart.service';
import { IProduct } from '../product-list/product-service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: IProduct[] = [];
  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log(this.cartService.cartItems());
  }

  remove(i: number){
    this.cartService.removeProductSignal(i);
  }

}
