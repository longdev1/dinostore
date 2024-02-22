import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Assignment';
  showHeaderAndFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let check = [
          'admin',
          'dangnhap',
          'dangky',
          'doimatkhau',
          'chitiet',
          'quenmatkhau',
          'recovery',
        ];
        let count = 0;
        const currentPath = this.router.url;
        check.forEach((item) => {
          if (currentPath.includes(item)) {
            count = 1;
            return;
          }
        });
        count == 1
          ? (this.showHeaderAndFooter = false)
          : (this.showHeaderAndFooter = true);
      }
    });
  }
}
