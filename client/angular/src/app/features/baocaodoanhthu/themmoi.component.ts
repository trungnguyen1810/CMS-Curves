import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyPhieuThuService } from './service/quanlyphieuthu.service';
import { MessageService } from 'primeng/api';
import { convertDateObjToYMD } from './../../core/utils/common-functions';
import {XemDonHangComponent} from './xemdonhang.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';
@Component({
  selector: 'app-themmoiphieuthu',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiPhieuThuComponent implements OnInit {
  hoivien: boolean = false;
  banle: boolean = false;
  showGhiChu:boolean=false;
  khachhangs: any = [];
  selectedKhachHang: any = {};
  sanphams: any = [];
  danhsachsanphams: any = [];
  selectedSanPham: any = {};
  Gia: any = [];
  TenKhachHang: any = '';
  Email: any = '';
  SoDienThoai: any = '';
  DiaChi: any = '';
  SoLuong: any = [];
  TongTienDungCu: number = 0;
  TongTienTuDo: number = 0;
  listCauHinh :any = [];
  makeHoiVien() {
    this.hoivien = true;
    this.banle = false;
    this.TenKhachHang = '';
    this.SoDienThoai = '';
    this.Email ='';
    this.DiaChi = '';
  }

  makeBanLe() {
    this.banle = true;
    this.hoivien = false;
    this.TenKhachHang = '';
    this.SoDienThoai = '';
    this.Email ='';
    this.DiaChi = '';
  }
  XoaSanPham(index) {
    this.sanphams.splice(index, 1);
    this.SoLuong.splice(index, 1);
    this.TinhTong();
  }
  onChangeNgayThue(){
   console.log(this.NgayBatDau);
   console.log(this.NgayKetThuc);
  }
  ThemSanPham() {
    if (this.selectedSanPham.Id > 0) {
      let check = true;
      for (let i = 0; i < this.sanphams.length; i++) {
        if (this.sanphams[i].Id == this.selectedSanPham.Id) {
          check = false;
        }
      }
      if (check) {
        this.selectedSanPham.Tong = this.selectedSanPham.Gia;
        this.sanphams.push(this.selectedSanPham);
        this.SoLuong.push({ value: 1 });
        this.Gia.push(this.selectedSanPham.Gia);
        this.TinhTong();
      }

    } else {
      alert('Vui lòng chọn sản phẩm')
      return;
    }
  }
  bindThongTin(e){
     this.TenKhachHang = e.value.HoVaTen;
     this.SoDienThoai = e.value.SoDienThoai;
     this.Email = e.value.Email;
     this.DiaChi = e.value.DiaChi;

  }
  onPressSoLuong(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  ChangeSoLuong(index) {
    if (this.SoLuong[index].value > 9999) {

      this.SoLuong[index].value = 9999;
    }
    this.sanphams[index].Tong = this.sanphams[index].Gia * this.SoLuong[index].value;
    this.TinhTong();
  }
  TinhTong() {
    let total = 0;
    for (let i = 0; i < this.sanphams.length; i++) {
      total += this.sanphams[i].Gia * this.SoLuong[i].value;
    }
    this.TongTienDungCu = total;
  }
  async ChangeTuDo(){
    // if(this.NgayBatDau == null || this.NgayKetThuc == null) return;
    // if(this.NgayBatDau > this.NgayKetThuc){
    //   alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc'); return;
    // }
    this.listCauHinh = await this.service.GetCauHinhTuDo();
    let listDate = [];
    this.TongTienTuDo = 0;
    let startDate = convertDateObjToYMD(this.NgayBatDau);
    let endDate = convertDateObjToYMD(this.NgayKetThuc);
    let dateMove = new Date(startDate);
    var strDate = startDate;
    if(strDate == endDate) listDate.push(strDate);
    while (strDate < endDate){
      var strDate = dateMove.toISOString().slice(0,10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);
    };
    for(let i = 0; i < listDate.length; i ++){
        for( let j = 0; j < this.listCauHinh.length ; j ++){
          if(new Date(listDate[i]) >= new Date(this.listCauHinh[j].TuNgay) && new Date(listDate[i]) <= new Date(this.listCauHinh[j].DenNgay) ){
            this.TongTienTuDo += Number(this.listCauHinh[j].GiaThueTheoNgay);
          }
        }
    }

  }

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenCauHinh: string = '';
  GiaThueTheoNgay: number;
  NgayBatDau: any = null;
  NgayKetThuc: any = null;


  constructor(public activeModal: NgbActiveModal, private service: QuanLyPhieuThuService, private messageService: MessageService,private modalService: NgbModal) { }
  ngOnInit(): void {
     this.hoivien = true;
    // if (this.data.tudo.Id != 0) {
    //   this.bindDataEdit(this.data.tudo);
    // }
    this.GetSanPham();
    this.GetAllKhachHang();
  }
  async Xem(){
    await this.ChangeTuDo();
    const modalRe = this.modalService.open(XemDonHangComponent,{size: 'lg',backdrop:'static'});
    if(this.NgayBatDau == null){

    }
    var data = {
      TenKhachHang: this.TenKhachHang,
      DiaChi:this.DiaChi,
      Email: this.Email,
      SoDienThoai: this.SoDienThoai,
      TongTienDungCu: this.TongTienDungCu,
      TongTienTuDo: this.TongTienTuDo,
      TuNgay: "",
      DenNgay: "",
      sanphams: this.sanphams
    };
    if(this.NgayBatDau != null){
      data.TuNgay = convertDateObjToYMD(this.NgayBatDau);
    }
    if(this.NgayKetThuc != null){
      data.DenNgay = convertDateObjToYMD(this.NgayKetThuc);
    }
    modalRe.componentInstance.data = data;

  }
  // async saveData() {
  //   this.ChangeTuDo();
  //   return;
  //   if (!this.TenCauHinh) {
  //     alert('Tên cấu hình bắt buộc nhập'); return;
  //   }
  //   if (!this.GiaThueTheoNgay) {
  //     alert('Giá thuê theo ngày bắt buộc nhập'); return;
  //   }
  //   if (!this.GiaThueTheoNgay) {
  //     alert('Giá thuê theo ngày bắt buộc nhập'); return;
  //   }

  //   if (!this.GiaThueTheoNgay) {
  //     this.GiaThueTheoNgay = 0;
  //   }
  //   if (this.GiaThueTheoNgay < 0) {
  //     alert('Giá giá thuê theo ngày bắt buộc nhập số nguyên dương'); return;
  //   }
  //   let body = {
  //     Id: this.data.tudo.Id,
  //     TenCauHinh: this.TenCauHinh,
  //     GiaThueTheoNgay:this.GiaThueTheoNgay,
  //     TuNgay: "",
  //     DenNgay: ""
  //   }
  //   if(this.NgayBatDau == null || this.NgayBatDau == ""){
  //     alert('Ngày bắt đầu bắt buộc nhập'); return;
  //   }else{
  //     body.TuNgay  = convertDateObjToYMD(this.NgayBatDau)
  //   }
  //   if(this.NgayKetThuc == null || this.NgayKetThuc == ""){
  //     alert('Ngày kết thúc bắt buộc nhập'); return;
  //   }else{
  //     body.DenNgay  = convertDateObjToYMD(this.NgayKetThuc)
  //   }
  //   if(this.NgayBatDau > this.NgayKetThuc){
  //     alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc'); return;
  //   }

  //   // alert(JSON.stringify(body)); return;
  //   let data = await this.service.saveData(body);
  //   alert(data['message']);
  //   if (data['errorcode'] == 0) {
  //     this.CallBack.emit(true);
  //     this.activeModal.close();
  //   }

  // }
  async GetSanPham() {
    let data = await this.service.GetAllSanPham();
    this.danhsachsanphams = data;
  }
  async GetAllKhachHang() {
    let data = await this.service.GetAllKhachHang();
    this.khachhangs = data;
  }



  async bindDataEdit(tudo) {
    this.TenCauHinh = tudo.TenCauHinh;
    this.GiaThueTheoNgay = tudo.GiaThueTheoNgay;
    if( tudo.TuNgay != null ){
      this.NgayBatDau = new Date(tudo.TuNgay);
    }
    if( tudo.DenNgay != null ){
      this.NgayKetThuc = new Date(tudo.DenNgay);
    }

  }
}
