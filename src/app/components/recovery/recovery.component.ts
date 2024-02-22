import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css',
})
export class RecoveryComponent {
  token: any;
  constructor(private service: AuthService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void {}
  async onSubmit(myform: any) {
    if (myform.value.pass !== '') {
      let result = await this.service.resetPass(this.token, myform.value.pass);
      console.log(result);
    }
  }
}
