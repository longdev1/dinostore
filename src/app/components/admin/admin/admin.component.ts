import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../../services/auth.service';
import { Chart } from 'chart.js';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  data: number[] = [];
  label: string[] = [];
  listCate: any;
  listProduct: any;
  listCategory: any;
  listAccount: any;
  constructor(private analytic: AuthService, private service: DataService) {}

  ngOnInit(): void {
    this.Render();
    this.getAmount();
  }
  async Render() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    this.listCate = await this.analytic.AmountProductInCate();
    console.log(this.listCate);

    this.listCate.forEach((res: any) => {
      this.data.push(res.amount);
      this.label.push(res.name);
    });
    const backgroundColors = Array.from({ length: this.data.length }, () =>
      this.getRandomColor()
    );

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [
          {
            data: this.data,
            backgroundColor: backgroundColors,
            hoverOffset: 3,
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
        },
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Biểu đồ sản phẩm trong danh mục',
          },
          tooltip: {
            usePointStyle: true,
          },
        },
      },
    });
  }

  getAmount() {
    this.service.getAmountProduct().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.listProduct = res.length;
          console.log(`lisst`, this.listProduct);
        } else {
          console.error('Response is not an array:', res);
        }
      },
      (error) => {
        console.error('Error fetching amount:', error);
      }
    );

    this.service.getAmountCate().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.listCategory = res.length;
          console.log(`lisst`, this.listProduct);
        } else {
          console.error('Response is not an array:', res);
        }
      },
      (error) => {
        console.error('Error fetching amount:', error);
      }
    );

    this.service.getAmountAccount().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.listAccount = res.length;
          console.log(`lisst`, this.listProduct);
        } else {
          console.error('Response is not an array:', res);
        }
      },
      (error) => {
        console.error('Error fetching amount:', error);
      }
    );
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
