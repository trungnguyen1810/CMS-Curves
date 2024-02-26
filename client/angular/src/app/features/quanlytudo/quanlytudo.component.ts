

import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyTuDoService} from './service/quanlytudo.service';
import {ThemMoiTuDoComponent} from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlytudo',
  templateUrl: './quanlytudo.component.html'
})
export class QuanlyTuDoComponent implements OnInit {
  tudos:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyTuDoService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
  }
  async GetAll(){
    this.tudos = await this.service.GetAll();
  }
  async ThemMoi(tudo){
    var title ='Thêm mới cấu hình tủ đồ';
    const modalRe = this.modalService.open(ThemMoiTuDoComponent,{size: 'lg',backdrop:'static'});
    if(tudo.Id!=0){
      title = 'Sửa cấu hình tủ đồ';
    }
    var data = {title:title,tudo:tudo};
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAll();
    });
  }
  async delete(tudo){
    var r = confirm("Bạn có chắc muốn xóa cấu hình này không ?");
    if (r == true) {
      let data = await this.service.Xoa(tudo.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();
      }
    }
  }



}

