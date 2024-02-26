import { Component, OnInit } from '@angular/core';
import {DanhMucSanPhamService} from './service/danhmucsanpham.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ThemmoiDanhMucSanPhamComponent} from './child-component/themmoi.component';
@Component({
  selector: 'app-danhmucsanpham',
  templateUrl: './danhmucsanpham.component.html',
  styleUrls: ['./danhmucsanpham.component.css']
})
export class DanhmucsanphamComponent implements OnInit {
  danhmucs:any=[];
  data : any;
  constructor(private readonly danhmucsanphamService: DanhMucSanPhamService,private modalService: NgbModal) { }

  async ngOnInit() {
    this.GetDanhMucSanPham();
    
  }
  ThemMoi(danhmuc){
    var title ='Thêm mới danh mục sản phẩm';
    const modalRe = this.modalService.open(ThemmoiDanhMucSanPhamComponent,{size: 'lg',backdrop:'static'});
    if(danhmuc.Id!=0){
      title = 'Sửa danh mục sản phẩm';
    }
    var data = {title:title,danhmuc:danhmuc};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetDanhMucSanPham();
    });
  }
  async delete(danhmuc){
    var r = confirm("Bạn có chắc muốn xóa danh mục này không này không ?");
    if (r == true) {
      let Id = danhmuc.Id;
      this.data = await this.danhmucsanphamService.delete(Id);
      alert(this.data.message);
      if(this.data.errorcode==0){
        this.GetDanhMucSanPham();
      }
    }
     
  }
  async GetDanhMucSanPham(){
    this.danhmucs = await this.danhmucsanphamService.GetAllDanhMucSanPham();
  }

}
