import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {CoolInputDirective} from "../../shared/directives/cool-input.directive";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{
  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  public formValues = {
    productTitle: '',
    address: '',
    phone: ''
  }
  ngOnInit(){
    /*if (this.cartService.product-card){
      this.formValues.productTitle = this.cartService.product-card;
    }*/

    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']){
        this.formValues.productTitle = params['product'];
      }
    })

    /*const productParam= this.activatedRoute.snapshot.queryParamMap.get('product');
    if (productParam){
      this.formValues.productTitle = productParam;
    }*/
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder(): void {
    if (!this.formValues.productTitle) {
      alert('Заполните пиццу');
      return;
    }
    if (!this.formValues.phone) {
      alert('Заполните телефон');
      return;
    }
    if (!this.formValues.address) {
      alert('Заполните адрес');
      return;
    }
    /*alert('Спасибо за заказ');
    this.formValues = {
      productTitle: '',
      address: '',
      phone: ''
    }*/
    this.subscriptionOrder = this.productService.createOrder({
      product: this.formValues.productTitle,
      address: this.formValues.address,
      phone: this.formValues.phone
    })
      .subscribe(response => {
        if (response.success && !response.message){
          alert('Спасибо за заказ');
          this.formValues = {
            productTitle: '',
            address: '',
            phone: ''
          }
        } else {
          alert ('Ошибка');
        }
      })
  }
}
