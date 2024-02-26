
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import $ from "jquery";


@Component({
  selector: 'app-in-hoa-don-goitap',
  templateUrl: './inhoadongoitap.component.html',
  providers: [DialogService]
})

export class InHoaDonGoiTapComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();


  Day: number = 0;
  Month: number = 0;
  Year: number = 0;
  datasave: any = {};
  Tien:string='';
  datasave1: any = {};
  datasave2: any = {};
  datasave3: any = {};
  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyKhacHangcService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    console.log(this.OBJ);

   this.GetThontin(this.OBJ.KhachHangId, this.OBJ.Id);
    var date = new Date();
    this.Day = date.getDate();
    this.Month = date.getMonth() + 1;
    this.Year = date.getFullYear();
    // this.Tien = this.convertNumberToMoney(this.OBJ.SoTienThanhToan);
    

  };

  async GetThontin(Id, KhachHangGoiTapId) {
    var item = {
      Id: Id,
      KhachHangGoiTapId: KhachHangGoiTapId
    }
    let data = await this.tintucservice.DanhSachThanhToanTheoDot_KhachHang(item);
    this.datasave1 = data;
    console.log(data);
    if(this.datasave1.errorcode !=0 || this.datasave1.data[0] == ''){
      alert('Chưa có hóa đơn cho gói tập này'); return;
    }else{
      this.datasave2 = this.datasave1.data[0];
      this.datasave3 = this.datasave1.data[1][0];
    }
  }




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


}
