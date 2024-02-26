

import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyChatLieuService} from './service/quanlychatlieu.service';
import {ThemMoiChatLieuComponent} from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlychatlieu',
  templateUrl: './quanlychatlieu.component.html',
  styleUrls: ['./quanlychatlieu.component.css']
})
export class QuanlychatlieuComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyChatLieuService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();  
  }
  async GetAll(){
    this.datas = await this.service.GetAll();
  }
  async ThemMoi(thongbao){
    var title ='Thêm mới thuộc tính chất liệu';
    const modalRe = this.modalService.open(ThemMoiChatLieuComponent,{size: 'lg',backdrop:'static'});
    if(thongbao.Id!=0){
      title = 'Sửa thuộc tính chất liệu';
    }
    var data = {title:title,thongbao:thongbao};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAll();
    });
  }
  async delete(thongbao){
    var r = confirm("Bạn có chắc muốn xóa thuộc tính chất liệu này không ?");
    if (r == true) {
      let data = await this.service.Xoa(thongbao.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
 
  

}

