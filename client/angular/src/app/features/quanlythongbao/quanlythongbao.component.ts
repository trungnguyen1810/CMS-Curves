import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyThongBaoService} from './service/quanlythongbao.service';
import {ThemMoiThongBaoComponent} from './child-component/themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlythongbao',
  templateUrl: './quanlythongbao.component.html',
  styleUrls: ['./quanlythongbao.component.css']
})
export class QuanlythongbaoComponent implements OnInit {
  thongbaos:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyThongBaoService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
    this.statuses = [
      {label: 'Chưa gửi', value: '0'},
      {label: 'Đã gửi', value: '1'}   
  ]
  }
  async GetAll(){
    this.thongbaos = await this.service.GetAll();
  }
  async ThemMoi(thongbao){
    var title ='Thêm mới thông báo';
    const modalRe = this.modalService.open(ThemMoiThongBaoComponent,{size: 'lg',backdrop:'static'});
    if(thongbao.Id!=0){
      title = 'Sửa thông báo';
    }
    var data = {title:title,thongbao:thongbao};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAll();
    });
  }
  async delete(thongbao){
    var r = confirm("Bạn có chắc muốn xóa thông báo này không ?");
    if (r == true) {
      let data = await this.service.Xoa(thongbao.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
  async sendnotifi(thongbao){
    var r = confirm("Bạn có chắc muốn gửi thông báo này không ?");
    if (r == true) {
      let data = await this.service.sendnotifi(thongbao.Id,thongbao.TieuDe,thongbao.NoiDung, thongbao.Type,thongbao.IdThongBao);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
  

}
