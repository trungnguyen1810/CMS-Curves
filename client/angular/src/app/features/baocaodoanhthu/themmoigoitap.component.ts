import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyPhieuThuService } from './service/quanlyphieuthu.service';
import { MessageService } from 'primeng/api';
import { convertDateObjToYMD } from './../../core/utils/common-functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';
@Component({
  selector: 'app-themmoiphieuthugoitap',
  templateUrl: './themmoigoitap.component.html',
  providers: [MessageService]
})

export class ThemMoiPhieuThuGoiTapComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenCauHinh: string = '';
  khachhangs: any = [];
  selectedKhachHang: any = {};
  TenKhachHang: any = '';
  Email: any = '';
  SoDienThoai: any = '';
  DiaChi: any = '';
  goitap:any={};
  SoTien : any = 0;
  constructor(public activeModal: NgbActiveModal, private service: QuanLyPhieuThuService, private messageService: MessageService,private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetAllKhachHang();
  }


  async GetAllKhachHang() {
    let data = await this.service.GetAllKhachHang();
    this.khachhangs = data;
  }
  async GetGoiTap(KhachHangId) {
    let data = await this.service.GetGoiTap(KhachHangId);
    if(data['length']>0){
      this.goitap = data[0];
      console.log(this.goitap);
      this.SoTien = data[0].GiaTien;
    }

  }
  bindThongTin(e){

    this.TenKhachHang = e.value.HoVaTen;
    this.SoDienThoai = e.value.SoDienThoai;
    this.Email = e.value.Email;
    this.DiaChi = e.value.DiaChi;
    this.GetGoiTap(e.value.Id);
  }
  async ThemMoiPhieuThu(){
    let body = {
      TenKhachHang:this.TenKhachHang,
      SoDienThoai : this.SoDienThoai,
      Email:this.Email,
      DiaChi:this.DiaChi,
      SoTien:this.SoTien
    }
    let data = await this.service.saveDataGoiTap(body);
    console.log(data);
  }


  async bindDataEdit(item) {

  }
}
