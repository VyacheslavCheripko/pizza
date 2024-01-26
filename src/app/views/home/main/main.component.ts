import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {from, map, Observable, Subject, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy, OnInit, AfterViewInit{
  private observable: Observable<number>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();

    let count: number = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeOut1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

    this.observable = from([1,2,3,4,5]);
    /*this.observable = new Observable((observer) => {
      let count: number = 0;
      const interval = setInterval(() => {
        observer.next(count++);
      }, 1000);
      const timeOut1 = setTimeout(() => {
        observer.complete();
      }, 4000);
      const timeOut2 = setTimeout(() => {
        observer.error('world');
      }, 5000);

      return {
        unsubscribe() {
          clearInterval(interval);
          clearTimeout(timeOut1);
          clearTimeout(timeOut2);
        }
      }
    })*/
  }
  @ViewChild(PopupComponent)
  private popupComponent! : PopupComponent;

  ngOnInit() {
    console.log(environment.production)
    /*const myModalAlternative = new bootstrap.Modal('#myModal');
    myModalAlternative.show();*/

    this.subscription = this.subject
      .subscribe( {
      next: (param: number) => {
        console.log('subscriber 1: ', param);
      },
      error: (error: string) => {
        console.log('ERROR!!! ' + error);
      }
    })
  }

  ngAfterViewInit() {
    this.popupComponent.open();
    // this.modalService.open(this.popup, {});
 /*   const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.data = 'Main component';*/
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test(){
    this.subject
      .pipe(
        map(
          number => {
            return 'Число: ' + number;
          }
        )
      )
      .subscribe((param: string) => {
      console.log('subscriber 2:', param);
    })
  }
}
