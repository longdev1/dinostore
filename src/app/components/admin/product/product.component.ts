import { Component, OnInit } from '@angular/core';
import { MyService } from '../../../services/my.service';
import { DataService } from '../../../services/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(
    private services: MyService,
    private dataService: DataService,
    private router: Router
  ) {}
  listProduct: any;
  listCategory: any;
  nameCate: any;
  selectedCategoryId: string = '';
  desc: string = '';
  image: any;
  imageUrl!: string;

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.services.getAll().subscribe((res) => {
      this.listProduct = res;
    });
    this.services.getListCategory().subscribe((res) => {
      this.listCategory = res;
    });
  }
  getNameCategory(productId: any) {
    if (this.listCategory) {
      let index = this.listCategory.findIndex(
        (cate: any) => cate.id == productId
      );
      if (index !== -1) {
        return this.listCategory[index].nameCate;
      } else {
        return 'Not found';
      }
    } else {
      return 'Category list is not defined';
    }
  }
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Vui lòng nhập');
      return;
    } else {
      let imgPath: any = await this.submitPhoto();
      form.value.image = imgPath;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thêm sản phẩm thành công',
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        this.dataService
          .addProduct(form.value)
          .subscribe(() => this.loadData());
        form.reset();
      }, 1000);
    }
  }

  deleteProduct(id: any) {
    Swal.fire({
      title: 'Xóa sản phẩm',
      text: 'Sản phẩm này sẽ được xóa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteProduct(id).subscribe(() => this.loadData());
        Swal.fire({
          title: 'Đã xóa',
          text: 'Sản phẩm đã được xóa!',
          icon: 'success',
        });
      }
    });
  }
  editProduct(id: any) {
    this.router.navigate(['/admin/sanpham/sua', id]);
  }

  // Image

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
    }
  }
  async submitPhoto() {
    let fd = new FormData();
    let imgPath = '';
    if (this.image) {
      fd.append('productImage', this.image, this.image.name);
      imgPath = await fetch('http://localhost:3001/upload/img', {
        method: 'POST',

        body: fd,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          return result.img;
        })
        .catch((err) => {});
    }
    if (!imgPath) {
      imgPath = 'http://127.0.0.1:3001/uploads/sach.jpg';
    }
    return imgPath;
  }
}
