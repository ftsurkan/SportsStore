import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from './store/store.module';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './store/checkout.component';
import { CartDetailComponent } from './store/cartDetail.component';



const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'cart', component: CartDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '/store' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
