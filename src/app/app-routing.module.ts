import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from './store/store.module';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './store/checkout.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { StoreFirstGuard } from './storeFirst.guard';


const routes: Routes = [
  {
    path: 'store', component: StoreComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'cart', component: CartDetailComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [StoreFirstGuard]
  },
  { path: '**', redirectTo: '/store' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [StoreFirstGuard]

})
export class AppRoutingModule { }
