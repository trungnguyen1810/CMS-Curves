
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyKhacHangcService} from '../service/quanlykhachhang.service';
import $ from "jquery";
import {InXacNhanComponent} from './inxacnhan.component';


@Component({
  selector: 'app-sua-tu-do',
  templateUrl: './sua-tu-do.component.html',
  providers: [DialogService]  
})

export class SuaTuDoComponent implements OnInit,OnDestroy  {
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
  HinhThucThanhToan: number=0;
  NgayThueTu : Date;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,private tintucservice :QuanLyKhacHangcService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
     console.log(this.OBJ);
     this.DanhSachTuDo();
     if(this.OBJ.TuNgay != '' && this.OBJ.TuNgay != null){
      this.TuNgay = new Date(this.OBJ.TuNgay1);
    }

    if(this.OBJ.NgayThueTu != '' && this.OBJ.NgayThueTu != null){
      this.NgayThueTu = new Date(this.OBJ.NgayTao);
    }

    this.GiaTien = this.convertNumberToMoney(this.OBJ.GiaTien);
    this.HinhThucThanhToan = this.OBJ.HinhThucThanhToan;
    if(this.OBJ.DenNgay != '' && this.OBJ.DenNgay != null){
      this.DenNgay = new Date(this.OBJ.DenNgay1);
    }

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

  DanhSachTuDo(){
    let body = {
      Id: this.OBJ.Id,
      TuNgay: '',
      DenNgay: ''
    }

    this.tintucservice.DanhSachTuDoTheoCLB(body).then((data) => {
      this.studos1 = data;
      this.studos= this.studos1.data;
      this.selectedTuDo = this.studos.find(country => country.Id === this.OBJ.TuDoId.toString());

    });
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

  
 Save() {    

      let batdau = '', ketthuc = '', ngaythuetu = '';
      if (this.TuNgay != null) {
        batdau = this.TuNgay.getFullYear() + '' + ('0' + (this.TuNgay.getMonth() + 1)).substr(-2) + '' + ('0' + this.TuNgay.getDate()).substr(-2);
      } else {
        alert('Từ ngày bắt buộc nhập'); return;
      }

      if (this.DenNgay != null) {
        ketthuc = this.DenNgay.getFullYear() + '' + ('0' + (this.DenNgay.getMonth() + 1)).substr(-2) + '' + ('0' + this.DenNgay.getDate()).substr(-2);
      } else {
        alert('Đến ngày bắt buộc nhập'); return;
      }
      if (batdau >= ketthuc) {
        alert('Từ ngày phải nhỏ hơn đến ngày'); return;
      }
      if(this.selectedTuDo.Id == 0){
        alert('Tủ đồ bắt buộc chọn'); return;
      }
      if (this.GiaTien == null || this.GiaTien.trim() == '') {
        alert('Phải nhập vào tiền thuê theo ngày'); return;
      }
      if (this.NgayThueTu != null) {
        ngaythuetu = this.NgayThueTu.getFullYear() + '' + ('0' + (this.NgayThueTu.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayThueTu.getDate()).substr(-2);
      } else {
        alert('Ngày thuê tủ bắt buộc nhập'); return;
      }
      let body = {
        Id: this.OBJ.KhachHangId,
        TuNgay: batdau,
        DenNgay: ketthuc,
        GiaTien: this.convertMoney(this.GiaTien),
        TuDoId: this.selectedTuDo.Id,
        KhachHangTuDoId: this.OBJ.Id, 
        HinhThucThanhToan : this.HinhThucThanhToan,
        NgayThueTu : ngaythuetu
      }
      this.SaveBody(body);
  }


  async SaveBody(body){

    let data = await this.tintucservice.khachhang_tudo_insert(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      if(this.datasave.data.Id == 2){
        alert('Tủ đồ đang có khách hàng đang thuê');
      }else if(this.datasave.data.Id == 1){
        alert('Tủ đồ đang thuê chưa hết hạn, chỉ được thêm tủ đồ mới khi thuê tủ đồ cũ hết hạn');
      }else {
        alert('Sửa thuê tủ đồ thành công');
        this.CallBack.emit(true);
        this.activeModal.close();
      }
    } else {
      alert('Sửa thuê tủ đồ lỗi')
      return;

    }
}




  
}
