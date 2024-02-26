
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import $ from "jquery";
import { AppSettings } from '../../../core/constants/Const';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-in-xac-nhan-sanpham',
  templateUrl: './inhoadonsanpham.component.html',
  providers: [DialogService]
})

export class InHoaDonSanPhamComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();


  Day: number = 0;
  Month: number = 0;
  Year: number = 0;
  datasave: any = {};
  Tien:string='';
  danhsachsanpham:any = {};
  donhang:any={};
  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyKhacHangcService,private http:HttpClient) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {

    var date = new Date();
    this.Day = date.getDate();
    this.Month = date.getMonth() + 1;
    this.Year = date.getFullYear();
    this.Tien = this.convertNumberToMoney(this.OBJ.SoTienThanhToan);
    console.log(this.OBJ);
    this.BindEditForm(this.OBJ.Id);

  };




  Save() {
    var divName = 'divInHoaDonMuaHang';
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes');
    popupWin.document.open();
    popupWin.document.write('<style>@media print {  @page { margin: 0; }  body { margin: 1.6cm; }}</style><html><head></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }

  close(){
    this.activeModal.dismiss();

  }


  convertNumberToMoney(n) {
    n = n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return n;
  }

  async BindEditForm(DonHangId) {
    this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/ChiTietDonHang`, { DonHangId: DonHangId }).subscribe(result => {
     let data_donhang = result.data.donhang;
     let data_sanpham = result.data.listsanpham;
     this.danhsachsanpham = data_sanpham;
     this.donhang = data_donhang;



    })

  }
}
