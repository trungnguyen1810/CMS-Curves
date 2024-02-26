

import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLySizeService} from './service/quanlysize.service';
import {ThemMoiSizeComponent} from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlysize',
  templateUrl: './quanlysize.component.html',
  styleUrls: ['./quanlysize.component.css']
})
export class QuanlysizeComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLySizeService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();  
  }
  async GetAll(){
    this.datas = await this.service.GetAll();
  }
  async ThemMoi(thongbao){
    var title ='Thêm mới thuộc tính size';
    const modalRe = this.modalService.open(ThemMoiSizeComponent,{size: 'lg',backdrop:'static'});
    if(thongbao.Id!=0){
      title = 'Sửa thuộc tính size';
    }
    var data = {title:title,thongbao:thongbao};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAll();
    });
  }
  async delete(thongbao){
    var r = confirm("Bạn có chắc muốn xóa thuộc tính size này không ?");
    if (r == true) {
      let data = await this.service.Xoa(thongbao.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
 
  

}

