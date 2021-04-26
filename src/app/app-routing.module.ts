import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './book/admin/admin-layout/admin-layout.component';
import { AuthorAddComponent } from './book/admin/author/author-add/author-add.component';
import { AuthorEditComponent } from './book/admin/author/author-edit/author-edit.component';
import { AuthorComponent } from './book/admin/author/author.component';
import { CateAddComponent } from './book/admin/category/cate-add/cate-add.component';
import { CateEditComponent } from './book/admin/category/cate-edit/cate-edit.component';
import { CateListComponent } from './book/admin/category/cate-list/cate-list.component';
import { DashboardComponent } from './book/admin/dashboard/dashboard.component';
import { PrdAddComponent } from './book/admin/product/prd-add/prd-add.component';
import { PrdEditComponent } from './book/admin/product/prd-edit/prd-edit.component';
import { ProductComponent } from './book/admin/product/product.component';
import { CategoryListComponent } from './book/client/category/category-list/category-list.component';

import { ClientLayoutComponent } from './book/client/client-layout/client-layout.component';
import { ProductDetailComponent } from './book/client/product/product-detail/product-detail.component';
import { ProductListComponent } from './book/client/product/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: ProductListComponent
      },
      {
        path: "category/:id",
        component: CategoryListComponent
      },
      {
        path: "detail/:bookId",
        component: ProductDetailComponent
      }
    ]
  },

  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },

      // category
      {
        path: "category",
        component: CateListComponent
      },
      {
        path: "category/add",
        component: CateAddComponent
      },
      {
        path: "category/edit/:id",
        component: CateEditComponent
      },

      // product
      {
        path: "product",
        component: ProductComponent
      },
      {
        path: "product/add",
        component: PrdAddComponent
      },
      {
        path: "product/edit/:id",
        component: PrdEditComponent
      },

      // author
      {
        path: "author",
        component: AuthorComponent
      },
      {
        path: "author/add",
        component: AuthorAddComponent
      },
      {
        path: "author/edit/:id",
        component: AuthorEditComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
