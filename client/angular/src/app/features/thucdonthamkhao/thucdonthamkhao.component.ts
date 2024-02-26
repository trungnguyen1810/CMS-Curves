import { Component, OnInit, ViewChild } from '@angular/core';
import { ThucDonThamKhaoService } from './service/thucdonthamkhao.service';
import { ThemmoiThucDonComponent } from './child-component/themmoi.component';
import { ChiTietThucDonComponent } from './child-component/chitiet.component';
import { ThemmoibuaanComponent } from './child-component/themmoibuaan.component';
import {CopyThucDonComponent} from './child-component/copythucdon.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-thucdonthamkhao',
  templateUrl: './thucdonthamkhao.component.html',
  styleUrls: ['./thucdonthamkhao.component.css']
})
export class ThucDonThamKhaoComponent implements OnInit {
  @ViewChild('dt') table: Table;
  datas: any = [];
  dataxoa: any = {};
  constructor(private readonly service: ThucDonThamKhaoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
  }
  async GetAll() {
    this.datas = await this.service.GetAll();
  }
  async ThemMoi(thucdon) {
    var title = 'Thêm mới thực đơn tham khảo';
    const modalRe = this.modalService.open(ThemmoiThucDonComponent, { size: 'lg', backdrop: 'static' });
    if (thucdon.Ngay != null) {
      title = 'Sửa thông tin thực đơn tham khảo';
    }
    var data = { title: title, thucdon: thucdon };
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe(data => {
      this.GetAll();
    });
  }
  ThemMoiBuaAn(){
    const modalRe2 = this.modalService.open(ThemmoibuaanComponent, { size: 'lg', backdrop: 'static' });
    
  }
  async delete(monan) {
    var r = confirm("Bạn có chắc muốn xóa thực đơn tham khảo này không ?");
    if (r == true) {
      let data = await this.service.Xoa(monan);
      this.dataxoa = data;
      if (this.dataxoa.errorcode == 0) {
  
        alert('Xóa thành công');
        this.GetAll();
      } else {
        alert(this.dataxoa.message); return;
  
      }
    }    
  }
  async XemChiTiet(monan) {
    const modalRe = this.modalService.open(ChiTietThucDonComponent, { size: 'lg', backdrop: 'static' });    
    var data = { monan: monan };
    modalRe.componentInstance.data = data;    
  }
  SaoChep(){
    
    const modalRe = this.modalService.open(CopyThucDonComponent, { size: 'lg', backdrop: 'static' });    
    modalRe.componentInstance.CallBack.subscribe(data => {
      if(data){
        this.GetAll();
      }      
    });
   
  }
  

}
