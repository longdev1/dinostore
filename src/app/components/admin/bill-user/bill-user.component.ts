import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { info } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-user',
  templateUrl: './bill-user.component.html',
  styleUrl: './bill-user.component.css',
})
export class BillUserComponent implements OnInit {
  constructor(
    private cart: CartService,
    private router: ActivatedRoute,
    private auth: AuthService,
    private route: Router
  ) {}
  id: any;
  user: any;
  infoBill: any;
  checkBill: boolean = false;
  idDetailBill: any;
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);

    if (this.id) {
      this.auth.getOneUser(this.id).subscribe((res) => {
        this.user = res.body.email;
        if (this.user) {
          this.cart.getBill(this.user).subscribe((res) => {
            this.infoBill = res.body;
            if (this.infoBill.length > 0) {
              this.checkBill = true;
            } else {
              this.checkBill = false;
            }
            console.log(this.checkBill);
            return this.checkBill;
          });
        }
      });
    }
  }
  viewBill(id: any) {
    this.route.navigate(['/admin/bill/bill-user/', this.id, 'detail', id]);
  }
}
