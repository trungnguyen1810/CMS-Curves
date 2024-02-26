
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyKhacHangcService} from '../service/quanlykhachhang.service';
import $ from "jquery";
import {InXacNhanComponent} from './inxacnhan.component';


@Component({
  selector: 'app-huy-khau-khach-hang',
  templateUrl: './huy-khach-hang.component.html',
  providers: [DialogService]  
})

export class HuyKhachHangComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  MatKhau:string='';
  SoNgay:number=0;
  LyDo:string='';
  NhapLaiMatKhau:string='';
  password:boolean=true;
  showImg:boolean=false;
  showImg2:boolean=false;
  loading =false;
  file:any=null;
  file2:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  NgayHetHanVoucher: Date;
  en: any;
  minimumDate = new Date();

  GiaTien: String = '';
  
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,private tintucservice :QuanLyKhacHangcService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
      dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: [ "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12" ],
      monthNamesShort: [ "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12" ],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
  };
    
 
  };
  


  
 Save() {    

    if(this.SoNgay <= 0 && (this.GiaTien == null || this.GiaTien.trim() == '')){
      alert('Phải nhập vào số ngày >0 hoặc giá trị số tiền hoàn trả');return;
    }

    if ((this.GiaTien != "") && ( this.SoNgay > 0)) {
      alert('Số ngày và số tiền hoàn trả chỉ được nhập 1 loại'); return;
    }
    
    if(this.NgayHetHanVoucher == null || this.NgayHetHanVoucher == undefined){
      alert('Ngày hết hạn voucher bắt buộc nhập');return;
    } 

    let songay = 0, giatien = 0;
    if(this.GiaTien != null && this.GiaTien.trim() != ''){
      giatien =  this.convertMoney(this.GiaTien);
    }
   
    if(this.SoNgay > 0){
      songay = (this.SoNgay);
    }

    if(!this.LyDo.trim()){
      this.LyDo = '';
    }   

    let hethan = '';

    hethan = this.NgayHetHanVoucher.getFullYear()+''+('0' + (this.NgayHetHanVoucher.getMonth() + 1)).substr(-2)+''+('0' +this.NgayHetHanVoucher.getDate()).substr(-2);
   
  
    
    let body = {
      Id: this.OBJ.Id,
      NgayHetHan: hethan,
      SoLuongNgay: Number(songay),
      SoTien: Number(giatien),
      LyDo: this.LyDo.trim(),
    }   
   
   
      this.SaveBody(body);
  }


  async SaveBody(body){


    let data = await this.tintucservice.HuyKhachHang_TaoVoucher(body);
    // console.log(data);
    this.loading=false;
    this.datasave = data;
    const modalRef = this.modalService.open(InXacNhanComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = this.datasave.data;
     
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
       this.CallBack.emit(true),
      this.activeModal.close()
      // this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
    //  if (this.datasave.errorcode == 0) {
    //     alert('Thay đổi mất khẩu thành công')
      // this.CallBack.emit(true);
      // this.activeModal.close();
    //  } else {
    //     alert('Thay đổi mật khẩu lỗi')
    //   return;

    // }
}




formatMoney(event) {
  this.GiaTien = this.convertMoney(this.GiaTien);
  this.GiaTien = this.GiaTien.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}
onPressTien(evt) {
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
convertMoney(m) {
  m = m.split(".").join("");
  return m;
}
convertNumberToMoney(n) {
  n = n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  return n;
}

  
}
