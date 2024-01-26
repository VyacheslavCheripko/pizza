import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InputTextModule,
    TuiButtonModule,
    OrderRoutingModule
  ],
  exports: [
    OrderRoutingModule,
    OrderComponent
  ]
})
export class OrderModule { }
