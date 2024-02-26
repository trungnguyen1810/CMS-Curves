

import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyColorService} from './service/quanlycolor.service';
import {ThemMoiColorComponent} from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlycolor',
  templateUrl: './quanlycolor.component.html'
})
export class QuanlycolorComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyColorService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();  
  }
  async GetAll(){
    this.datas = await this.service.GetAll();
  }
  async ThemMoi(thongbao){
    var title ='Thêm mới thuộc tính color';
    const modalRe = this.modalService.open(ThemMoiColorComponent,{size: 'lg',backdrop:'static'});
    if(thongbao.Id!=0){
      title = 'Sửa thuộc tính color';
    }
    var data = {title:title,thongbao:thongbao};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAll();
    });
  }
  async delete(thongbao){
    var r = confirm("Bạn có chắc muốn xóa thuộc tính color này không ?");
    if (r == true) {
      let data = await this.service.Xoa(thongbao.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
 
  

}

