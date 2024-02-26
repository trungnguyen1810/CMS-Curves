
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyVoucherService} from '../service/quanlyvoucher.service';
import $ from "jquery";

interface SanPham {
  Id: number;
  TenSanPham: string;
}
interface Goitap {
  Id: number;
  TenCauHinh: string;
}
interface KhachHang {
  Id: number,
  SoDienThoai: string
}
@Component({
  selector: 'app-them-moi-voucher',
  templateUrl: './them-moi-voucher.component.html',
  providers: [DialogService]  
})

export class ThemMoiVoucherComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  MaVoucher: string = '';
  NgayHetHan: Date;
  isChecked:boolean=false;
  LoaiMa:number =1;
  khachhangs: KhachHang[];
  selectedKhachHang: KhachHang[];
  khachhang1 : any;
  danhsach:boolean=true;
  danhsach1:boolean=true;
  danhsach2:boolean=true;
  DMUD:boolean=true;
  selectedSanPham: SanPham;
  sanphams: SanPham[];
  sanphams1: any = [];
  SoLuongNgay: number;
  SoTien: string = '';
  TenSanPham: string='';
  
  loading =false;
  datasave:any={};
  en: any;
  constructor(public activeModal: NgbActiveModal,private tintucservice :QuanLyVoucherService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
    if(this.OBJ.Id == 0){
      this.danhsach = false;
      this.danhsach1 = true;
      this.danhsach2 = true;
    } else {
      if(this.OBJ.LoaiMa == 1){
        this.danhsach = false;
        this.danhsach1 = true;
        this.danhsach2 = true;
      } else if (this.OBJ.LoaiMa == 2) {
        this.danhsach = true;
        this.danhsach1 = false;
        this.danhsach2 = true;
      }else if (this.OBJ.LoaiMa == 3) {
        this.danhsach = true;
        this.danhsach1 = true;
        this.danhsach2 = false;
      }
    }
    
    this.MaVoucher = this.OBJ.MaVoucher;
    if(this.OBJ.NgayHetHan != ""){
      this.NgayHetHan = new Date(this.OBJ.NgayHetHan);
    }
    
    this.SoLuongNgay = this.OBJ.SoLuongNgay;
    console.log(this.OBJ.SoTien);
    if(this.OBJ.SoTien !="" && this.OBJ.SoTien !=null){
      this.SoTien = this.convertNumberToMoney(this.OBJ.SoTien);
    }else{
      this.SoTien = this.OBJ.SoTien;
    }
    
    this.TenSanPham = this.OBJ.TenSanPham;
    this.LoaiMa = this.OBJ.LoaiMa;


    this.tintucservice.GetSanPham().then((data) => {
      this.sanphams1 = data
      this.sanphams = this.sanphams1;
      
      // this.selectedCity = this.cities[0];
      this.selectedSanPham = this.sanphams.find(country => country.Id === this.OBJ.SanPhamId.toString());
      if(!this.selectedSanPham){
        this.selectedSanPham = data[0];
      }
    })

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

   
    this.Title = this.OBJ.Title;

    
   

  };

  CheckTinhTrang(event) {
    this.isChecked= event.target.checked;   
  }

  TangSanPham(event){
    // console.log(event);
    this.danhsach = true;
    this.danhsach1 = false;
    this.danhsach2 = true;
    this.selectedKhachHang =  this.OBJ.khachhang;
  }

  TangNgayTap(event){
    // console.log(event);
    this.danhsach = false;
    this.danhsach1 = true;
    this.danhsach2 = true;
    this.selectedKhachHang =  this.OBJ.khachhang;
  }

  TangTien(event){
    // console.log(event);
    this.danhsach = true;
    this.danhsach1 = true;
    this.danhsach2 = false;
    this.selectedKhachHang =  this.OBJ.khachhang;
  }

  onPressMaUuDai(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    
    var regex= /^[0-9a-zA-Z]*$/g;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  


  
 Save() { 
   
  //  alert(this.NgayBatDau.getFullYear()+''+(this.NgayBatDau.getMonth() + 1)+''+this.NgayBatDau.getDate());

   
    if(!this.MaVoucher.trim()){
      alert('Mã Voucher bắt buộc nhập');return;
    } 

   
    if(!this.NgayHetHan){
      alert('Ngày hết hạn bắt buộc chọn');return;
    }  
    
    let soluongngay, sotien, sanphamid, tensanpham = '';
    if(this.LoaiMa == 1){
      if(!this.SoLuongNgay){
        alert('Số lượng ngày bắt buộc nhập');return;
      }
      soluongngay =  this.SoLuongNgay;
      sanphamid=0;
      tensanpham = '';
      sotien = 0;
    }else if(this.LoaiMa == 2){
      if(this.selectedSanPham.Id == 0 && !this.TenSanPham){
        alert('Bắt buộc chọn sản phẩm hoặc nhập tên sản phẩm');return;
      }
       
      soluongngay = 0;
      sotien = 0;
      sanphamid=this.selectedSanPham.Id;
      tensanpham = this.TenSanPham;
    }else{
      if(!this.SoTien){
        alert('Số tiền bắt buộc nhập');return;
      }
      soluongngay =  0;
      sanphamid=0;
      tensanpham = '';
      sotien = this.convertMoney(this.SoTien);
    }
    let ngayhethan = '' 
    if(this.NgayHetHan != null){
      ngayhethan = this.NgayHetHan.getFullYear()+''+('0' + (this.NgayHetHan.getMonth() + 1)).substr(-2)+''+('0' +this.NgayHetHan.getDate()).substr(-2)+' '+('0' +this.NgayHetHan.getHours()).substr(-2)+''+('0' +this.NgayHetHan.getMinutes()).substr(-2)+'00';
    }


  
    let body = {
      Id: this.OBJ.Id,
      MaVoucher: this.MaVoucher,
      NgayHetHan: ngayhethan,
      soluongngay: soluongngay,
      sotien: sotien,
      sanphamid:sanphamid,
      tensanpham: tensanpham||'',
      LoaiMa: this.LoaiMa,
      TinhTrang: this.isChecked ? 1 : 0
      // NgayKetThuc: ketthuc,
      // NgaySinh : ngaysinh
    }   
    console.log(body);
    // this.activeModal.close();
    this.loading=true;
    this.SaveBody(body);
    
  }

  async SaveBody(body){
    let data = await this.tintucservice.saveData(body);
    this.loading=false;
    this.datasave = data;
     if (this.datasave.errorcode == 0) {
       if(this.OBJ.Id == 0){
        alert('Thêm mới thành công')
       }else{
        alert('Sửa thành công')
       }
      
      this.CallBack.emit(true);
      this.activeModal.close();
     } else {
      if(this.OBJ.Id == 0){
        alert(this.datasave.message)
       }else{
        alert(this.datasave.message)
       }
      return;

    }
}

formatMoney(event) {
  this.SoTien = this.convertMoney(this.SoTien);
  this.SoTien = this.SoTien.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
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


 

IsEmail(search: string) {
  var searchfind: boolean;
  var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  searchfind = regexp.test(search);
  if (searchfind) {
    return searchfind;
  } else {
    return searchfind;
  }
}
IsPhone(search: string) {
  var searchfind: boolean;
  var regexp = new RegExp('^[0-9]+$');
  searchfind = regexp.test(search);
  if (searchfind) {
    return searchfind;
  } else {
    return searchfind;
  }
}


  
}
