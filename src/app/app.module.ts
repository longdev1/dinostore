import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { HotproductComponent } from './components/hotproduct/hotproduct.component';
import { DiscountproductComponent } from './components/discountproduct/discountproduct.component';
import { LegoproductComponent } from './components/legoproduct/legoproduct.component';
import { ModeltoysComponent } from './components/modeltoys/modeltoys.component';
import { ListproductCateComponent } from './components/listproduct-cate/listproduct-cate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Moment } from 'moment';
import swal from 'sweetalert';

import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/admin/product/product.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HistorycartComponent } from './components/historycart/historycart.component';
import { AccountmanageComponent } from './components/accountmanage/accountmanage.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { InfobillComponent } from './components/infobill/infobill.component';
import { AccountComponent } from './components/admin/account/account.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { BillaccountComponent } from './components/admin/billaccount/billaccount.component';
import { BillUserComponent } from './components/admin/bill-user/bill-user.component';
import { DetailComponent } from './components/admin/detail/detail.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListproductComponent,
    DetailproductComponent,
    HotproductComponent,
    DiscountproductComponent,
    LegoproductComponent,
    ModeltoysComponent,
    ListproductCateComponent,
    CartComponent,
    SignupComponent,
    ErrorComponent,
    SigninComponent,
    AdminComponent,
    SidebarComponent,
    CategoryComponent,
    ProductComponent,
    EditproductComponent,
    PaymentComponent,
    HistorycartComponent,
    AccountmanageComponent,
    ChangepassComponent,
    InfobillComponent,
    AccountComponent,
    ForgotpassComponent,
    RecoveryComponent,
    BillaccountComponent,
    BillUserComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    NgChartsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
