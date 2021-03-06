import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserComponent } from './components/user/user.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';
import { RegisterProductsComponent } from './components/register-products/register-products.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'shopping-cart', 
    component: ShoppingCartComponent 
  },
  { path: 'create-user', 
    component: RegisterUsersComponent 
  },
  { path: 'alter-user/:id', 
  component: RegisterUsersComponent 
  },
  { path: 'user', 
    component: UserComponent 
  },
  { path: 'create-product', 
    component: RegisterProductsComponent 
  },
  { path: 'alter-products/:id', 
    component: RegisterProductsComponent 
  },
  { path: 'products', 
    component: ProductComponent
  },
  { path: '404', 
    component: Page404Component
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
