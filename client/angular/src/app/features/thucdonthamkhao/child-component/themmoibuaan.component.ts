import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThucDonThamKhaoService } from '../service/thucdonthamkhao.service';
import { MessageService } from 'primeng/api';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-themmoithucdonthamkhaobuaan',
  templateUrl: './themmoibuaan.component.html',
  providers: [MessageService]
})

export class ThemmoibuaanComponent implements OnInit {

  datas: any = [];
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  NgayThamKhao: any = null;
  @ViewChild('dt') table: Table;
  clonedProducts: { [s: string]: any; } = {};
  TenBuaAn:string='';
  showlist: boolean;
  TenBuaAnEdit:string="";
  ThuTuSapXepEdit:number =1;
  IdEdit :number =0;
  constructor(public activeModal: NgbActiveModal, private service: ThucDonThamKhaoService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.bindDataNgay();
    this.showlist = true;
  }
  
  bindDataNgay() {
    this.NgayThamKhao = new Date();
    this.bindDataBua(convertDateObjToYMD(this.NgayThamKhao));
  }
  async bindDataBua(Ngay) {
    this.datas = await this.service.GetDanhSachBuaAnTheoNgay(Ngay);
  }
  async ThemMoiBuaAn() {
   if(!this.TenBuaAn){
     alert('Tên bữa ăn bắt buộc nhập');return;
   } 
   let data = await this.service.ThemMoiTenBuaAnTheoNgay(convertDateObjToYMD(this.NgayThamKhao),this.TenBuaAn);
   alert(data['message']);
   if(data['errorcode']==0){
    this.TenBuaAn="";
    this.bindDataBua(convertDateObjToYMD(this.NgayThamKhao));
   }
   console.log(data);
  }



  EditTenBuaAn(buaan){
    this.showlist = !this.showlist;
    this.TenBuaAnEdit = buaan.TenBuaAn;
    this.ThuTuSapXepEdit = buaan.ThuTuSapXep;
    this.IdEdit = buaan.Id;
  }
  async XoaTenBuaAn(buaan){
    let r = confirm('Bạn có chắc muốn xóa tên bữa ăn này không?');
    if(r){
      let data = await this.service.XoaBuaAnTheoNgay(buaan.Id);
      alert(data['message']);
      if(data['errorcode']==0){
        this.bindDataBua(convertDateObjToYMD(this.NgayThamKhao));
       }
       console.log(data);
    }
  }
  
  onSelectNgay(e){
    this.bindDataBua(convertDateObjToYMD(this.NgayThamKhao));    
  }
  closeFormEdit(){
    this.showlist = true;
  }
  async SaveFormEdit(){
    if(!this.TenBuaAnEdit.trim()){
      alert('Tên bữa ăn bắt buộc nhập');return;
    }
    if(this.ThuTuSapXepEdit<1){
      alert('Thứ tự sắp xếp phải lớn hơn 0');return;
    }
    let data = await this.service.EditTenBuaAnTheoNgay(this.TenBuaAnEdit.trim(),this.ThuTuSapXepEdit,this.IdEdit)
    alert(data['message']);
   if(data['errorcode']==0){
    this.showlist = true;
    this.bindDataBua(convertDateObjToYMD(this.NgayThamKhao));
   }
   console.log(data);
   
  }
  
}
