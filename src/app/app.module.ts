import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CateListComponent } from './book/admin/category/cate-list/cate-list.component';
import { AdminLayoutComponent } from './book/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './book/admin/dashboard/dashboard.component';
import { ProductComponent } from './book/admin/product/product.component';
import { AuthorComponent } from './book/admin/author/author.component';
import { CateAddComponent } from './book/admin/category/cate-add/cate-add.component';
import { CateEditComponent } from './book/admin/category/cate-edit/cate-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrdAddComponent } from './book/admin/product/prd-add/prd-add.component';
import { PrdEditComponent } from './book/admin/product/prd-edit/prd-edit.component';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
} from "@angular/fire/storage";
import { environment } from "../environments/environment";
import { ClientLayoutComponent } from './book/client/client-layout/client-layout.component';
import { AuthorAddComponent } from './book/admin/author/author-add/author-add.component';
import { AuthorEditComponent } from './book/admin/author/author-edit/author-edit.component';
import { ProductListComponent } from './book/client/product/product-list/product-list.component';
import { ProductDetailComponent } from './book/client/product/product-detail/product-detail.component';
import { CategoryListComponent } from './book/client/category/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CateListComponent,
    AdminLayoutComponent,
    DashboardComponent,
    ProductComponent,
    AuthorComponent,
    CateAddComponent,
    CateEditComponent,
    PrdAddComponent,
    PrdEditComponent,
    ClientLayoutComponent,
    AuthorAddComponent,
    AuthorEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
