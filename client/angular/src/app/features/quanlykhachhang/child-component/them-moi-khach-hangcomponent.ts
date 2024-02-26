
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyKhacHangcService} from '../service/quanlykhachhang.service';
import $ from "jquery";
export class TieuSu {
  Id : number
  TenBenh : string
}
interface Lacbo {
  Id: number;
  CauLacBo: string;
}
interface Goitap {
  Id: number;
  TenCauHinh: string;
}
@Component({
  selector: 'app-them-moi-khach-hang',
  templateUrl: './them-moi-khach-hang.component.html',
  providers: [DialogService]  
})

export class ThemMoiKhachHangComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  HoVaTen: string = '';
  SoDienThoai: string = '';
  Email: string = '';
  DiaChi: string = '';
  tinhtrang:number = 0;
  HienThi:boolean=false;
  MatKhau:string='';
  SoThe:string='';
  NhapLaiMatKhau:string='';
  NoiDung:string='';
  imageSrc: string='';
  imageSrc2: string='';
  AnhDaiDien:string='';
  AnhBia:string='';
  NgayCapNhat:any='';
  TuKhoa:any="";
  password:boolean=true;
  sothe:boolean=false;
  showImg:boolean=false;
  showImg2:boolean=false;
  loading =false;
  file:any=null;
  file2:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  NgaySinh: Date;
  NgayBatDau: Date;
  NgayKetThuc: Date;
  en: any;
  selectedCauLacBo: Lacbo;
  caulacbos: Lacbo[];
  caulacbos1: any = [];
  selectedGoiTap: Goitap;
  goitaps: Goitap[];
  goitaps1: any = [];

  ZaloFb: any = '';
  NgheNghiep: any = '';
  GhiChu: any = '';
  LienLacKhanCap: any = '';
  TieuSuSucKhoe: any = '';
  Voucher: any = '';
  PhiGiaNhap: string;

  selectedNguonKhachHang: any = {};
  nguonkhachhangs: any = [];
  minimumDate = new Date();
  datangay:any={};

  flagbatdau: boolean = true;
  flaggoitap: boolean = true;
  flagghilai: number = 1;

  NgayDangKy: Date;
  TienDatCoc: string;
  SoNgayTang: number = 0;
  ThuThach : number =0 ;
  IdGoi : number =0;
  selectedTieuSu:any = [];

  tieusus: TieuSu[];
  tieusus1: any = [];

  HinhThucThanhToan:number=1;
  constructor(public activeModal: NgbActiveModal,private tintucservice :QuanLyKhacHangcService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
    if(this.OBJ.CauLacBoId == null){
      this.OBJ.CauLacBoId = 0;
     }

     if(this.OBJ.GoiTapId == null){
      this.OBJ.GoiTapId = 0;
     }


     if(this.OBJ.NgayConLai ==0){
      this.flagbatdau = false;
      this.flaggoitap = false;
     }
     
     if(this.OBJ.TinhTrangView ==3){
      this.flagghilai = 2;
     }


     this.GetNguonKhachHang();
     this.GetTieuSuBenh(); 
    this.tintucservice.GetCauLacBo().then((data) => {
      this.caulacbos1 = data
      this.caulacbos = this.caulacbos1;
      // // this.selectedCity = this.cities[0];
      // console.log(this.caulacbos);
      // console.log(this.OBJ.CauLacBoId);
      this.selectedCauLacBo = this.caulacbos.find(country => country.Id.toString() === this.OBJ.CauLacBoId.toString())

      for (let i = 0; i < this.nguonkhachhangs.length; i++) {
        if (this.nguonkhachhangs[i].Id == this.OBJ.NguonKhachHangId) {
          this.selectedNguonKhachHang = this.nguonkhachhangs[i]; break;
        }
      }

    })

    this.tintucservice.GetGoiTap().then((data) => {
      this.goitaps1 = data
      this.goitaps = this.goitaps1;
      // this.selectedCity = this.cities[0];
      this.selectedGoiTap = this.goitaps.find(country => country.Id === this.OBJ.GoiTapId.toString())
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

    if(this.OBJ.Id == 0){
      this.password = true;
      this.sothe = false;
      this.tinhtrang=0;
    } else {
      this.password = false;
      this.sothe = true;
      // if(this.OBJ.TinhTrang == 1){
        this.tinhtrang=this.OBJ.TinhTrang;
      // }else{
      //   this.tinhtrang=2;
      // }
    }
    this.Title = this.OBJ.Title;

    
    this.HoVaTen = this.OBJ.HoVaTen;
    this.SoDienThoai = this.OBJ.SoDienThoai;
    this.SoThe = this.OBJ.SoThe;
    this.AnhDaiDien = this.OBJ.AnhDaiDien;
    this.AnhBia = this.OBJ.AnhBia;
    this.Email=this.OBJ.Email;
    this.DiaChi = this.OBJ.DiaChi;
    this.ZaloFb = this.OBJ.ZaloFb;
    this.NgheNghiep = this.OBJ.NgheNghiep;
    this.GhiChu = this.OBJ.GhiChu;
    this.LienLacKhanCap = this.OBJ.LienLacKhanCap;
    this.TieuSuSucKhoe = this.OBJ.TieuSuSucKhoe;
    this.Voucher = this.OBJ.Voucher;
    this.PhiGiaNhap = this.OBJ.PhiGiaNhap;
    if(this.OBJ.NgaySinh != '' && this.OBJ.NgaySinh != null){
      this.NgaySinh = new Date(this.OBJ.NgaySinh);
    }
    if(this.OBJ.NgayBatDau != '' && this.OBJ.NgayBatDau != null){
      this.NgayBatDau = new Date(this.OBJ.NgayBatDau);
    }

    if(this.OBJ.NgayKetThuc != '' && this.OBJ.NgayKetThuc != null){
      this.NgayKetThuc = new Date(this.OBJ.NgayKetThuc);
    }
   
    if (this.OBJ.NgayDangKy != '' && this.OBJ.NgayDangKy != null) {
      this.NgayDangKy = new Date(this.OBJ.NgayDangKy);
    }
    if (this.OBJ.HinhThucThanhToan != '' && this.OBJ.HinhThucThanhToan != null) {
      this.HinhThucThanhToan = this.OBJ.HinhThucThanhToan;
    }
    if (this.OBJ.ThuThach != '' && this.OBJ.ThuThach != null){
     
      this.ThuThach = this.OBJ.ThuThach;
    }
    // this.TienDatCoc = this.OBJ.TienDatCoc;
    if(this.OBJ.TienDatCoc){
      this.TienDatCoc = this.convertNumberToMoney(this.OBJ.TienDatCoc)
    }else{
      this.TienDatCoc = '';
    };
    if(this.OBJ.PhiGiaNhap){
      this.PhiGiaNhap = this.convertNumberToMoney(this.OBJ.PhiGiaNhap)
    }else{
      this.PhiGiaNhap = '';
    };
    this.SoNgayTang = this.OBJ.SoNgayTang;
    this.HienThi = this.OBJ.TinhTrang?true:false;
    this.imageSrc = this.OBJ.AnhDaiDien;
    this.imageSrc2 = this.OBJ.AnhBia;
    if(this.OBJ.AnhDaiDien!='' &&this.OBJ.AnhDaiDien!=null){
      this.showImg = true;
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
    } 
    if(this.OBJ.AnhBia!='' &&this.OBJ.AnhBia!=null){
      this.showImg2 = true;
      $('.preview2').addClass('it');
      $('.btn-rmv2').addClass('rmv');
    } 
  };
  
  readURL(event:any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if(typefile.toUpperCase()!='JPG'&&typefile.toUpperCase()!='PNG'){
      alert('File không hỗ trợ');return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
       this.imageSrc = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
      this.showImg = true;
      this.file = event.target.files[0];  
      this.AnhDaiDien = '1';   
    }
  }
  removeImg(event:any){
    $('.preview1').removeClass('it');
    $('.btn-rmv1').removeClass('rmv');
    this.showImg = false;
    this.imageSrc = '';
    this.file = null;
    this.AnhDaiDien='';
  }

  readURL2(event:any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if(typefile.toUpperCase()!='JPG'&&typefile.toUpperCase()!='PNG'){
      alert('File không hỗ trợ');return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
       this.imageSrc2 = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      $('.preview2').addClass('it');
      $('.btn-rmv2').addClass('rmv');
      this.showImg2 = true;
      this.file2 = event.target.files[0];  
      this.AnhBia = '1';   
    }
  }
  removeImg2(event:any){
    $('.preview2').removeClass('it');
    $('.btn-rmv2').removeClass('rmv');
    this.showImg2 = false;
    this.imageSrc2 = '';
    this.file2 = null;
    this.AnhBia='';
  }

  async GetNguonKhachHang() {
    let data = await this.tintucservice.GetNguonKhachHang();
    this.nguonkhachhangs = data;
    this.selectedNguonKhachHang = this.nguonkhachhangs[0];
  }

  async GetTieuSuBenh() {
    let data = await this.tintucservice.QuanLyHoiVien_GetSucKhoe();
    this.tieusus1 = data;
    this.tieusus = this.tieusus1;
    // this.selectedTieuSu = this.tieusus[0];
    if(this.OBJ.SucKhoeId!=null){
      let arr_size = this.OBJ.SucKhoeId.split(',');
      for(let i=0;i<arr_size.length;i++){
        for(let j=0;j<this.tieusus.length;j++){
          if(this.tieusus[j].Id==arr_size[i]){
            this.selectedTieuSu.push(this.tieusus[j]);
          }
        }
      }
     }
  }


  async moveDate(event: any) {
    if (event == null || this.selectedGoiTap.Id == 0) {
      this.NgayKetThuc = null;
    } else {
      let voucher ='', songaytang =0;
      if (this.Voucher) {
        voucher = this.Voucher.trim();
      }
  
      if (this.SoNgayTang) {
        songaytang = Number(this.SoNgayTang);
      }
      var item = {
        Id: this.selectedGoiTap.Id,
        NgayBatDau: this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2),
        SoNgayTang : songaytang,
        Voucher: voucher
      }
      let data = await this.tintucservice.loadngayketthuc(item);

      this.datangay = data;
      console.log(this.datangay.data[0]);
      if(this.datangay.data[0].Id ==1){
        this.NgayKetThuc = null;
      }else{
        this.NgayKetThuc = new Date(this.datangay.data[0].NgayKetThuc);
      }
    };
  }

  async onBlurMethod(event: any) {
    if (event == null || this.selectedGoiTap.Id == 0) {
      this.NgayKetThuc = null;
    } else {
      let voucher ='', songaytang =0;
      if (this.Voucher) {
        voucher = this.Voucher.trim();
      }
  
      if (this.SoNgayTang) {
        songaytang = Number(this.SoNgayTang);
      }
      var item = {
        Id: this.selectedGoiTap.Id,
        NgayBatDau: this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2),
        SoNgayTang : songaytang,
        Voucher: voucher
      }
      let data = await this.tintucservice.loadngayketthuc(item);
      console.log(data);
      this.datangay = data;
      console.log(this.datangay.data[0]);
      if(this.datangay.data[0].Id ==1){
        this.NgayKetThuc = null;
      }else{
        this.NgayKetThuc = new Date(this.datangay.data[0].NgayKetThuc);
      }
    };
  }

  async onChange(event: any) {
    if (event.value.Id == 0 || this.NgayBatDau == null) {
      this.NgayKetThuc = null;
    } else {
      let voucher ='', songaytang =0;
      if (this.Voucher) {
        voucher = this.Voucher.trim();
      }
  
      if (this.SoNgayTang) {
        songaytang = Number(this.SoNgayTang);
      }
      var item = {
        Id: event.value.Id,
        NgayBatDau: this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2),
        SoNgayTang : songaytang,
        Voucher: voucher
      }
      let data = await this.tintucservice.loadngayketthuc(item);

      this.datangay = data;
      console.log(this.datangay.data[0]);
      if(this.datangay.data[0].Id ==1){
        this.NgayKetThuc = null;
      }else{
        this.NgayKetThuc = new Date(this.datangay.data[0].NgayKetThuc);
      }
    }
  }

  async onEnterChange(searchValue: string) {  
    if(this.NgayBatDau != null){
      let voucher ='', songaytang =0;
      if (this.Voucher) {
        voucher = this.Voucher.trim();
      }
  
      if (searchValue) {
        songaytang = Number(searchValue);
      }
      var item = {
        Id: this.selectedGoiTap.Id,
        NgayBatDau: this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2),
        SoNgayTang : songaytang,
        Voucher: voucher
      }
      let data = await this.tintucservice.loadngayketthuc(item);

      this.datangay = data;
     
      if(this.datangay.data[0].Id ==1){
        this.NgayKetThuc = null;
      }else{
        var NgayKT = new Date(this.datangay.data[0].NgayKetThuc);
        this.NgayKetThuc = NgayKT;
      }
    }
  }
  async onChangeVoucher(searchValue: string) { 
    if(this.NgayBatDau != null){
      let voucher ='', songaytang =0;
      if (searchValue) {
        voucher = searchValue.trim();
      }
  
      if (this.SoNgayTang) {
        songaytang = Number(this.SoNgayTang);
      }
      var item = {
        Id: this.selectedGoiTap.Id,
        NgayBatDau: this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2),
        SoNgayTang : songaytang,
        Voucher: voucher
      }
      let data = await this.tintucservice.loadngayketthuc(item);

      this.datangay = data;
     
      if(this.datangay.data[0].Id ==1){
        this.NgayKetThuc = null;
      }else{
        var NgayKT = new Date(this.datangay.data[0].NgayKetThuc);
        this.NgayKetThuc = NgayKT;
      }
    }
  }



  formatMoney1(event) {
    this.PhiGiaNhap = this.convertMoney(this.PhiGiaNhap);
    this.PhiGiaNhap = this.PhiGiaNhap.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  }
 

  formatMoney(event) {
    this.TienDatCoc = this.convertMoney(this.TienDatCoc);
    this.TienDatCoc = this.TienDatCoc.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
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
   
  //  alert(this.NgayBatDau.getFullYear()+''+(this.NgayBatDau.getMonth() + 1)+''+this.NgayBatDau.getDate());
    if(!this.HoVaTen){
      alert('Họ và tên khách hàng bắt buộc nhập');return;
    }
   
    if(!this.SoDienThoai){
      alert('Số điện thoại bắt buộc nhập');return;
    } 

    if (this.IsPhone(this.SoDienThoai.trim()) == false) {
      alert('Số điện thoại sai định dạng'); return;
    }
    if(this.Email){
      if (this.IsEmail(this.Email.trim()) == false) {
        alert('Email sai định dạng'); return;
      }
    }  

    if(this.OBJ.Id == 0){
      if(!this.MatKhau){
        alert('Mật khẩu bắt buộc nhập');return;
      }  
      
      if(!this.NhapLaiMatKhau){
        alert('Nhập lại mật khẩu bắt buộc nhập');return;
      } 
      
      if(this.NhapLaiMatKhau.trim() != this.MatKhau.trim()){
        alert('Nhập lại mật khẩu không khớp');return;
      }   
    }

    if(this.OBJ.Id != 0){
      if(!this.SoThe){
        alert('Số thẻ bắt buộc nhập');return;
      }  
      
      // if (this.IsPhone(this.SoThe.trim()) == false) {
      //   alert('Số thẻ chỉ nhập số'); return;
      // }
    }
   
    if(this.tinhtrang == 0){
      alert('Tình trạng hoạt động bắt buộc chọn');return;
    }  

    if(this.OBJ.NgayConLai ==0){
      if(this.selectedGoiTap.Id == 0){
          alert('Gói tập mới bắt buộc chọn buộc chọn khi chọn gói tập'); return;
      } else {
        if(this.NgayBatDau == null){
          alert('Ngày bắt đầu bắt bắt buộc chọn'); return;
        }
        // else{
        //   let batdau = '', now = '';
        //   let date = new Date();
        //   batdau = this.NgayBatDau.getFullYear()+''+('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2)+''+('0' +this.NgayBatDau.getDate()).substr(-2);
        //   now = date.getFullYear()+''+('0' + (date.getMonth() + 1)).substr(-2)+''+('0' +date.getDate()).substr(-2);
        //   if(batdau < now){
        //     alert('Chọn ngày bắt đầu gói tập mới lớn hơn thời gian hiện tại'); return;
        //   }
        // }
      }

    }
    // if(!this.AnhDaiDien){
    //   alert('Ảnh đại diện bắt buộc chọn');return;
    // }  
    // if(!this.AnhBia){
    //   alert('Ảnh bìa bắt buộc chọn');return;
    // }   
    // if(!this.DiaChi){
    //   alert('Địa chỉ bắt buộc nhập');return;
    // }

    // if(!this.NgaySinh){
    //   alert('Ngày sinh bắt buộc chọn');return;
    // }
    
    let batdau = '', ketthuc = '', email = '', ngaysinh = '', sothe = '', diachi = '', anhdaidien = '', anhbia = '', voucher = '';
    let zalofb = '', nghenghiep = '', ghichu = '', lienlackhancap = '', tieususuckhoe = '', ngaydangky = '', sotiencoc = 0, songaytang =0, phigianhap = 0;
    if(this.NgaySinh != null){
      ngaysinh = this.NgaySinh.getFullYear()+''+('0' + (this.NgaySinh.getMonth() + 1)).substr(-2)+''+('0' +this.NgaySinh.getDate()).substr(-2);
    }
    if(this.NgayBatDau != null){
      batdau = this.NgayBatDau.getFullYear()+''+('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2)+''+('0' +this.NgayBatDau.getDate()).substr(-2);
    }

    if(this.NgayKetThuc != null){
      ketthuc = this.NgayKetThuc.getFullYear()+''+('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2)+''+('0' +this.NgayKetThuc.getDate()).substr(-2);
    }
    if (this.NgayDangKy != null) {
      ngaydangky = this.NgayDangKy.getFullYear() + '' + ('0' + (this.NgayDangKy.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayDangKy.getDate()).substr(-2);
    }
    if (this.TienDatCoc) {
      sotiencoc = this.convertMoney(this.TienDatCoc);
    }
    if (this.PhiGiaNhap) {
      phigianhap = this.convertMoney(this.PhiGiaNhap);
    }
    if (this.SoNgayTang) {
      songaytang = Number(this.SoNgayTang);
    }
    let pass = this.MatKhau.trim();

    if(this.OBJ.Id > 0) {
      pass = '';
      sothe = this.SoThe.trim();
    }

    if (this.Voucher) {
      voucher = this.Voucher.trim();
    }
    if(this.Email) {
      email = this.Email.trim();
    }

    if(this.AnhDaiDien){
      anhdaidien = this.AnhDaiDien;
    }  
    if(this.AnhBia){
      anhbia = this.AnhBia;
    }  

    if(this.DiaChi) {
      diachi = this.DiaChi.trim();
    }

    
    if (this.ZaloFb) {
      zalofb = this.ZaloFb.trim();
    }

    if (this.NgheNghiep) {
      nghenghiep = this.NgheNghiep.trim();
    }

    if (this.GhiChu) {
      ghichu = this.GhiChu.trim();
    }

    if (this.LienLacKhanCap) {
      lienlackhancap = this.LienLacKhanCap.trim();
    }

    if (this.TieuSuSucKhoe) {
      tieususuckhoe = this.TieuSuSucKhoe.trim();
    }
    let arr_benh= [];
    for(let i=0;i<this.selectedTieuSu.length;i++){
      arr_benh.push(this.selectedTieuSu[i].Id);
    }
    let body = {
      Id: this.OBJ.Id,
      HoVaTen: this.HoVaTen.trim(),
      SoDienThoai: this.SoDienThoai.trim(),
      Email: this.Email.trim(),
      MatKhau: pass,
      SoThe: sothe,
      DiaChi: diachi,
      TinhTrang: Number(this.tinhtrang),
      AnhDaiDien:anhdaidien,
      AnhBia:anhbia,
      NgaySinh : ngaysinh,
      NgayBatDau: batdau,
      NgayKetThuc: ketthuc,
      CauLacBoId: this.selectedCauLacBo.Id,
      GoiTapId: this.selectedGoiTap.Id,
      ZaloFb: zalofb,
      NgheNghiep: nghenghiep,
      GhiChu: ghichu,
      LienLacKhanCap: lienlackhancap,
      TieuSuSucKhoe: tieususuckhoe,
      NguonKhachHang: this.selectedNguonKhachHang.Id,
      NgayDangKy: ngaydangky,
      ThuThach: Number(this.ThuThach),
      TieuSu : arr_benh.toString(),
      TienDatCoc: sotiencoc,
      SoNgayTang: songaytang,
      HinhThucThanhToan : this.HinhThucThanhToan,
      PhiGiaNhap: phigianhap,
      Voucher: voucher
    }   
    if(body.GoiTapId>0){
      if(body.NgayKetThuc==''){
        alert('Ngày kết thúc bắt buộc chọn trong trường hợp có gói tập');return;
      }
      if(body.NgayBatDau==''){
        alert('Ngày bắt đầu bắt buộc chọn trong trường hợp có gói tập');return;
      }
    }
    // this.activeModal.close();
    this.loading=true;
    if(this.file!=null){
      this.PostImage(body);
    }else{
      this.SaveAnhBia(body);
    }
  }
  async SaveAnhBia(body){
    if(this.file2!=null){
      this.PostImage2(body);
    }else{
      this.SaveBody(body);
    }
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

  async PostImage(body){   
      var data = new FormData(); data.append('file', this.file);
      let data1 = await this.tintucservice.upload(data);
      this.dataupload = data1;
      if (this.dataupload.errorcode == 0){
           body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
           this.SaveAnhBia(body);
      } else {
        alert ('Upload ảnh đại diện lỗi');
      }
    
  }

  
  async PostImage2(body){   
    var data = new FormData(); data.append('file', this.file2);
    let data1 = await this.tintucservice.upload(data);
    this.dataupload = data1;
    if (this.dataupload.errorcode == 0){
         body.AnhBia = '/upload/' + this.dataupload.data.filename;
         this.SaveBody(body);
    } else {
      alert ('Upload ảnh đại diện lỗi');
    }
  
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
