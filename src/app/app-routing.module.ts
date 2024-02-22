import { NgModule } from '@angular/core';
import { SecurityGuard } from './security.guard';
import { AdminGuard } from '../guard/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ListproductCateComponent } from './components/listproduct-cate/listproduct-cate.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
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
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'sanpham',
    children: [
      { path: '', component: ListproductComponent },
      { path: ':id', component: DetailproductComponent },
    ],
  },

  { path: 'loai/:id', component: ListproductCateComponent },
  {
    path: 'cart',
    children: [
      { path: '', component: CartComponent },
      { path: 'thanhtoan', component: PaymentComponent },
    ],
  },
  { path: 'dangnhap', component: SigninComponent },
  { path: 'dangky', component: SignupComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminComponent },
      { path: 'loaihang', component: CategoryComponent },
      { path: 'sanpham', component: ProductComponent },
      { path: 'sanpham/sua/:id', component: EditproductComponent },
      { path: 'taikhoan', component: AccountComponent },
      {
        path: 'bill',
        children: [
          {
            path: '',
            component: BillaccountComponent,
          },
          {
            path: 'bill-user/:id',
            children: [
              { path: '', component: BillUserComponent },
              { path: 'detail/:id', component: DetailComponent },
            ],
          },
        ],
      },
    ],
  },

  {
    path: 'lichsudonhang',
    children: [
      {
        path: '',
        component: HistorycartComponent,
        canActivate: [SecurityGuard],
      },
      { path: 'chitiet/:id', component: InfobillComponent },
    ],
  },

  {
    path: 'quanlytaikhoan',
    canActivate: [SecurityGuard],
    children: [
      {
        path: '',
        component: AccountmanageComponent,
      },
      { path: 'doimatkhau/:id', component: ChangepassComponent },
    ],
  },
  { path: 'chitiet', component: InfobillComponent },
  { path: 'quenmatkhau', component: ForgotpassComponent },
  { path: 'recovery/:token', component: RecoveryComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
