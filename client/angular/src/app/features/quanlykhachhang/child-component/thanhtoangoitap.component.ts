
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyKhacHangcService} from '../service/quanlykhachhang.service';
import $ from "jquery";
import {InXacNhanComponent} from './inxacnhan.component';
import { AppSettings } from '../../../core/constants/Const';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-thanhtoangoitap',
  templateUrl: './thanhtoangoitap.component.html',
  providers: [DialogService]  
})

export class ThanhToanGoiTapComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa thuê tủ đồ';
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
  TuNgay: Date;
  DenNgay: Date;
  en: any;
  minimumDate = new Date();
  GiaTien: String = '';
  selectedTuDo: any = {};
  studos: any = [];
  studos1: any = [];
  MaVoucher:string='';
  GiaTriVoucher:number = 0;
  showformvoucher:boolean=false;
  HinhThucThanhToan:number=1;
  GiaTriVoucherMoTa:string='';
  KhachHangId:Number = 1;
  SoTienThanhToan:number=0;
  NgayThanhToan: Date;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,private tintucservice :QuanLyKhacHangcService, private http:HttpClient) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
     console.log(this.OBJ);

    if(this.OBJ.DenNgay != '' && this.OBJ.DenNgay != null){
      this.DenNgay = new Date(this.OBJ.DenNgay1);
    }
    // this.GiaTien = this.convertNumberToMoney(this.OBJ.GiaTien);
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

  KiemTraMaVoucher() {
    if (!this.MaVoucher) {
      alert('Vui lòng nhập mã voucher !'); return;
    } else {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/KiemTraMaVoucher`, { MaVoucher: this.MaVoucher.trim(), KhachHangId: this.KhachHangId }).subscribe(result => {
        this.GiaTriVoucherMoTa = result.message;
        if(parseInt(result.errorcode)==0){
         this.GiaTriVoucher = parseInt(result.message);
         if(this.SoTienThanhToan<0){
           this.SoTienThanhToan=0;
         }
       }else{
        this.GiaTriVoucher = 0;
        this.MaVoucher = '';

       }
      })
    }
  }

  
 Save() {    

      let  ketthuc = '', ngaythanhtoan = '', giatien = '0';
   
      if (this.DenNgay != null) {
        ketthuc = this.DenNgay.getFullYear() + '' + ('0' + (this.DenNgay.getMonth() + 1)).substr(-2) + '' + ('0' + this.DenNgay.getDate()).substr(-2);
      }

      if (this.NgayThanhToan != null) {
        ngaythanhtoan = this.NgayThanhToan.getFullYear() + '' + ('0' + (this.NgayThanhToan.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayThanhToan.getDate()).substr(-2);
      }
    
     
      if ((this.GiaTien == null || this.GiaTien.trim() == '') && ( this.GiaTriVoucher == 0)) {
        alert('Phải nhập vào số tiền trả hoặc voucher'); return;
      }

      let body = {
        Id: 0,
        NgayHenTra: ketthuc,
        GiaTien: this.convertMoney(this.GiaTien)|0,
        KhachHangId: this.OBJ.KhachHangId,
        KhachHangGoiTapId: this.OBJ.Id,
        MaVoucher: this.MaVoucher,
        GiaTriVoucher: this.GiaTriVoucher,
        HinhThucThanhToan: this.HinhThucThanhToan,
        NgayThanhToan: ngaythanhtoan,
      }
      this.SaveBody(body);
  }


  async SaveBody(body){

    let data = await this.tintucservice.ThemMoiLichSuThanhToanGoiTap(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      
        alert('Thanh toán thành công');
        this.CallBack.emit(true);
        this.activeModal.close();
    } else {
      alert('Thanh toán lỗi')
      return;

    }
}




  
}
