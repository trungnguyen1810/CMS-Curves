
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyCauLacBoService } from '../service/quanlycaulacbo.service';
import $ from "jquery";
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

interface City {
  Id: number;
  TenDiaBan: string;
}
@Component({
  selector: 'app-them-moi-cau-lac-bo',
  templateUrl: './them-moi-cau-lac-bo.component.html',
  providers: [DialogService, MessageService]
})

export class ThemMoiCauLacBoComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  TieuDe: string = '';
  TenCLB: string = '';
  SoDienThoai: string = '';
  MaCauLacBo: string = '';
  SoDienThoaiZalo: string = '';
  Idmessenger: string = '';
  Email: string = '';
  ThoiGianHoatDong: string = '';
  DiaChi: string = '';
  TinhTrang: boolean = false;
  cities: City[];
  cities1: any = [];
  selectedCity: City;
  tintuc: number = 0;
  HienThi: boolean = false;
  TomTat: string = '';
  NoiDung: string = '';
  imageSrc: string = '';
  AnhDaiDien: string = '';
  NgayCapNhat: any = '';
  TuKhoa: any = "";
  HoTen: string = '';
  DienThoai: string = '';
  EmailND: string = '';
  TenDangNhap: string = '';
  MatKhau: string = '';
  XNMatKhau: string = '';
  showImg: boolean = false;
  loading = false;
  file: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};
  password:boolean=true;


  constructor(public activeModal: NgbActiveModal, private caulacboservice: QuanLyCauLacBoService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    if (this.OBJ.Id == 0) {
      this.password = true;
      $('.nguoidung').removeClass('header');
    } else {
      this.password = false;
      $('.nguoidung').addClass('header');
    }
   

    if(this.OBJ.TinhThanhId == null){
      this.OBJ.TinhThanhId = 0;
     }

    this.caulacboservice.GetTinhThanh().then((data) => {
      this.cities1 = data
      this.cities = this.cities1
      // this.selectedCity = this.cities[0];
      this.selectedCity = this.cities.find(country => country.Id.toString() === this.OBJ.TinhThanhId.toString())
    })
    this.primengConfig.ripple = true;
    this.Title = this.OBJ.Title;
    this.TenCLB = this.OBJ.TenCauLacBo;
    this.MaCauLacBo = this.OBJ.MaCauLacBo;
    this.SoDienThoai = this.OBJ.SoDienThoai;
    this.Email = this.OBJ.Email;
    this.AnhDaiDien = this.OBJ.AnhDaiDien;
    this.DiaChi = this.OBJ.DiaChi;
    this.ThoiGianHoatDong = this.OBJ.ThoiGianHoatDong;
    this.SoDienThoaiZalo = this.OBJ.SoDienThoaiZalo;
    this.Idmessenger = this.OBJ.Idmessenger;
    // this.selectedCity =  {
    //   Id: 1,
    //   TenDiaBan: 'Hà Nội'
    //  };
     
    this.HienThi = this.OBJ.TinhTrang ? true : false;
    this.imageSrc = this.OBJ.AnhDaiDien;
    if (this.OBJ.AnhDaiDien != '' && this.OBJ.AnhDaiDien != null) {
      this.showImg = true;
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
    }
  };

  readURL(event: any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if (typefile.toUpperCase() != 'JPG' && typefile.toUpperCase() != 'PNG') {
      alert('File không hỗ trợ'); return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
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
  removeImg(event: any) {
    $('.preview1').removeClass('it');
    $('.btn-rmv1').removeClass('rmv');
    this.showImg = false;
    this.imageSrc = '';
    this.file = null;
    this.AnhDaiDien = '';
  }



  Save() {
    if (!this.TenCLB) {
      this.showWarn('Tên câu lạc bộ bắt buộc nhập'); return;
      // alert('Tên câu lạc bộ bắt buộc nhập');return;
    }

    if (!this.SoDienThoai.trim()) {
      this.showWarn('Số điện thoại buộc nhập'); return;
    }
    if (this.IsPhone(this.SoDienThoai.trim()) == false) {
      this.showWarn('Số điện thoại sai định dạng'); return;
    }
    if (!this.Email.trim()) {
      this.showWarn('Email bắt buộc nhập'); return;
    }
    if (this.IsEmail(this.Email.trim()) == false) {
      this.showWarn('Email sai định dạng'); return;
    }
    if (this.selectedCity.Id == 0) {
      this.showWarn('Tỉnh thành buộc chọn'); return;
    }
    if (!this.DiaChi.trim()) {
      this.showWarn('Địa chỉ buộc chọn'); return;
    }
    if (!this.AnhDaiDien) {
      this.showWarn('Ảnh đại diện bắt buộc chọn'); return;
    }
    if (!this.SoDienThoaiZalo.trim()) {
      this.showWarn('Số điện thoại zalo buộc nhập'); return;
    }
    if (this.IsPhone(this.SoDienThoaiZalo.trim()) == false) {
      this.showWarn('Số điện thoại zalo sai định dạng'); return;
    }
    if (!this.Idmessenger) {
      this.showWarn('Idmessenger bắt buộc nhập'); return;
    }
    if (!this.ThoiGianHoatDong.trim()) {
      this.showWarn('Thời gian hoạt động bắt buộc nhập'); return;
    }
    if (this.OBJ.Id == 0) {

      if (!this.HoTen.trim()) {
        this.showWarn('Họ tên người dùng quản trị bắt buộc nhập'); return;
      }
      if (!this.DienThoai.trim()) {
        this.showWarn('Điện thoại người dùng quản trị bắt buộc nhập'); return;
      }
      if (this.IsPhone(this.DienThoai.trim()) == false) {
        this.showWarn('Điện thoại người dùng sai định dạng'); return;
      }
      if (!this.TenDangNhap.trim()) {
        this.showWarn('Tên đăng nhập người dùng quản trị bắt buộc nhập'); return;
      }
      var TENDANGNHAP_REGEXP = /^[A-Za-z0-9._]+$/;
      if (!TENDANGNHAP_REGEXP.test(this.TenDangNhap.trim()) && this.TenDangNhap.trim() != '') {
        this.showWarn('Tên đăng nhập không đúng định dạng'); return;
      }
      if (!this.MatKhau.trim()) {
        this.showWarn('Mật khẩu bắt buộc nhập'); return;
      }
      if (!this.XNMatKhau.trim()) {
        this.showWarn('Xác nhận mật khẩu bắt buộc nhập'); return;
      }

      if (this.MatKhau.trim().length < 6) {
        this.showWarn('Mật khẩu mới có ít nhất 6 ký tự'); return;
      }

      if (this.MatKhau.trim() != this.XNMatKhau.trim()) {
        this.showWarn('Mật khẩu mới không khớp'); return;
      }

    }


    if (this.EmailND.trim()) {
      if (this.IsEmail(this.EmailND.trim()) == false) {
        this.showWarn('Email sai định dạng'); return;
      }
    }



    let body = {
      Id: this.OBJ.Id,
      TenCauLacBo: this.TenCLB.trim(),
      SoDienThoai: this.SoDienThoai.trim(),
      Email: this.Email.trim(),
      TinhThanhId: this.selectedCity.Id,
      DiaChi: this.DiaChi.trim(),
      TinhTrang: this.HienThi ? 1 : 0,
      AnhDaiDien: this.AnhDaiDien.trim(),
      SoDienThoaiZalo: this.SoDienThoaiZalo.trim(),
      Idmessenger: this.Idmessenger.trim(),
      ThoiGianHoatDong: this.ThoiGianHoatDong.trim(),
      HoTen: this.HoTen.trim(),
      DienThoai: this.DienThoai.trim(),
      EmailND: this.EmailND.trim(),
      TenDangNhap: this.TenDangNhap.trim(),
      MatKhau: this.MatKhau.trim()
    }
    // console.log(body);
    this.activeModal.close();
    this.loading = true;
    if (this.file != null) {
      this.PostImage(body);
    } else {
      this.SaveBody(body);
    }
  }
  async SaveBody(body) {
    let data = await this.caulacboservice.saveData(body);
    this.loading = false;
    this.datasave = data;
    console.log(data)
    if (this.datasave.errorcode == 0) {
      if (this.OBJ.Id == 0) {
        alert('Thêm mới thành công');
      } else {
        alert('Sửa thành công');
      }

      this.CallBack.emit(true);
      this.activeModal.close();
    } else {
      alert(this.datasave.message);
      return;

    }
  }

  async PostImage(body) {
    var data = new FormData(); data.append('file', this.file);
    let data1 = await this.caulacboservice.upload(data);
    this.dataupload = data1;
    if (this.dataupload.errorcode == 0) {
      body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
      this.SaveBody(body);
    } else {
      alert('Upload ảnh lỗi');
    }

  }


  showWarn(detail) {
    this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Lỗi', detail: detail });
  }
  showInfo(detail) {
    this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: detail });
  }

  onReject() {
    this.messageService.clear('c');
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
