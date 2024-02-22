import { Component, OnInit } from '@angular/core';
import { MyService } from '../../../services/my.service';
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  constructor(private service: MyService, private dataService: DataService) {}
  listCate: any;
  cate: any;
  idCate: any;
  isInputDisabled: boolean = true;

  ngOnInit(): void {
    this.loadCate();
  }
  loadCate() {
    return this.service.getListCategory().subscribe((res) => {
      this.listCate = res;
    });
  }
  onSubmit(form: any) {
    if (form.invalid) {
      alert('Vui lòng nhập');
      return;
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thêm sản phẩm thành công',
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        this.dataService.addCate(form.value).subscribe(() => this.loadCate());
        form.reset();
      }, 1000);
    }
  }

  deleteCate(id: any) {
    Swal.fire({
      title: 'Xóa loại hàng',
      text: 'Loại hàng này sẽ được xóa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteCate(id).subscribe(() => this.loadCate());
        Swal.fire({
          title: 'Đã xóa',
          text: 'Loại hàng đã được xóa!',
          icon: 'success',
        });
        this.cate = '';
      }
    });
  }

  editCate(id: any) {
    this.service.getNameCategory(id).subscribe((res) => {
      this.cate = res[0].nameCate;
      this.idCate = id;
      this.isInputDisabled = false; // Bật chế độ enabled
    });
  }
  onEdit(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Chưa có tên loại hàng cần sửa',
      });
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đã sửa tên loại hàng',
      });
      this.dataService
        .updateCate(this.idCate, form.value)
        .subscribe(() => this.loadCate());
    }
  }
}
