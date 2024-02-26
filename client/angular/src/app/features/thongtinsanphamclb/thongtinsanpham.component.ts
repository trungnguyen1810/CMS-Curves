import { Component, OnInit ,ViewChild} from '@angular/core';
import {QuanLySanPhamService} from './service/quanlysanpham.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ThemmoiSanPhamComponent} from './child-component/themmoi.component';
import {ThemSoLuongComponent} from './child-component/themsoluong.component';
import { Table } from 'primeng/table';
import {BaoCaoTonKhoComponent} from './child-component/baocaotonkho.component';


@Component({
  selector: 'app-thongtinsanpham',
  templateUrl: './thongtinsanpham.component.html',
  styleUrls: ['./thongtinsanpham.component.css']
})
export class ThongtinsanphamComponent implements OnInit {
  sanphams :any = [];
  @ViewChild('dt') table: Table;
  statuses:any=[];
  constructor(private readonly sanphamService: QuanLySanPhamService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAllProduct();
    this.statuses = [
      {label: 'Không hoạt động', value: '0'},
      {label: 'Hoạt động', value: '1'}
  ]
  }
  ThemMoi(sanpham){
    var title ='Thêm mới sản phẩm';
    const modalRe = this.modalService.open(ThemmoiSanPhamComponent,{size: 'lg',backdrop:'static'});
    if(sanpham.Id!=0){
      title = 'Sửa thông tin sản phẩm';
    }
    var data = {title:title,sanpham:sanpham};
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAllProduct();
    });

  }
  ThemMoiSoLuong(sanpham){
    var title ='Thêm số lượng sản phẩm';
    const modalRe = this.modalService.open(ThemSoLuongComponent,{size: 'lg',backdrop:'static'});
    var data = {title:title,sanpham:sanpham};
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAllProduct();
    });
  }
  BaoCaoTonKho(sanpham){
    var title ='Xuất báo cáo tồn kho';
    const modalRe = this.modalService.open(BaoCaoTonKhoComponent,{size: 'lg',backdrop:'static'});
    var data = {title:title};
    modalRe.componentInstance.data = data;

  }

   async GetAllProduct(){
     this.sanphams = await this.sanphamService.GetAll();
   }
   delete(sanpham){
     let c = confirm('Bạn có chắc muốn xóa sản phẩm này không ?');
     if(c){
      this.sanphamService.delete(sanpham.Id);
      this.GetAllProduct();
      alert('Xóa sản phẩm thành công');
     }

   }
}
