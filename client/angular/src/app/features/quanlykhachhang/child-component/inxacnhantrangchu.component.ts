
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import $ from "jquery";


@Component({
  selector: 'app-in-xac-nhan-trangchu',
  templateUrl: './inxacnhantrangchu.component.html',
  providers: [DialogService]
})

export class InXacNhanTrangChuComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  // MatKhau: string = '';
  // SoNgay: number = 0;
  LyDo: string = '';
  Ten: string = '';
  SDT: string = '';
  NgayHetHan: string = '';
  Voucher: string = '';
  SoNgay: number = 0;
  SoTien: number = 0;
  Day: number = 0;
  Month: number = 0;
  Year: number = 0;
  password: boolean = true;
  showImg: boolean = false;
  showImg2: boolean = false;
  loading = false;
  file: any = null;
  file2: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};


  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyKhacHangcService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    var date = new Date();
    this.Day = date.getDate();
    this.Month = date.getMonth() + 1;
    this.Year = date.getFullYear();
    this.tintucservice.ChiTietHuyThanhVien( this.OBJ).then((data) => {
      console.log(data);
      this.datasave = data;
      this.Ten =  this.datasave.data.HoVaTen;
      this.NgayHetHan =  this.datasave.data.HanSuDung;
      this.SDT = this.datasave.data.SoDienThoai;
      this.SoNgay = this.datasave.data.SoNgayHoanTra;
      this.SoTien = this.datasave.data.SoTienHoanTra;
      this.Voucher = this.datasave.data.MaVouCher;
    })
    
    // console.log(this.OBJ);

  };




  Save() {
    var divName = 'divInXacNhan';
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes');
    popupWin.document.open();
    popupWin.document.write('<style>@media print {  @page { margin: 0; }  body { margin: 1.6cm; }}</style><html><head></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }

  close(){
    this.activeModal.dismiss();
    this.CallBack.emit(true),
    location.reload();
  }





}
