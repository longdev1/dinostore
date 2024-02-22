// admin.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      const roleNumber = role ? +role : null; // Convert role to number or set to null if role is null

      if (roleNumber === 0) {
        return true; // Cho phép truy cập nếu role là 0
      } else {
        this.router.navigateByUrl('/dangnhap'); // Chuyển hướng về trang đăng nhập nếu không có quyền hoặc không đăng nhập
        return false;
      }
    } else {
      this.router.navigateByUrl('/dangnhap'); // Chuyển hướng về trang đăng nhập nếu localStorage không khả dụng
      return false;
    }
  }
}
