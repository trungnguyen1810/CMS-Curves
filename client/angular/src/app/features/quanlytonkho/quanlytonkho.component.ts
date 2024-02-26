import { Component, OnInit ,ViewChild} from '@angular/core';
import {QuanLyTonKhoService} from './service/quanlytonkho.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ThemmoiTonKhoComponent} from './child-component/themmoi.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlytonkho',
  templateUrl: './quanlytonkho.component.html',
  styleUrls: ['./quanlytonkho.component.css']
})
export class QuanLyTonKhoComponent implements OnInit {
  sanphams :any = [];
  @ViewChild('dt') table: Table;
  statuses:any=[];
  constructor(private readonly sanphamService: QuanLyTonKhoService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAllProduct();
    this.statuses = [
      {label: 'Không hoạt động', value: '0'},
      {label: 'Hoạt động', value: '1'}
  ]
  }
  ThemMoi(sanpham){
    var title ='Thêm mới sản phẩm';
    const modalRe = this.modalService.open(ThemmoiTonKhoComponent,{size: 'lg',backdrop:'static'});
    if(sanpham.Id!=0){
      title = 'Sửa thông tin sản phẩm';
    }
    var data = {title:title,sanpham:sanpham};
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAllProduct();
    });

  }

   async GetAllProduct(){
     this.sanphams = await this.sanphamService.GetAll();
     console.log(this.sanphams)
   }
   delete(sanpham){
     this.sanphamService.delete(sanpham.Id);
     this.GetAllProduct();
     alert('Xóa sản phẩm thành công');
   }
}
