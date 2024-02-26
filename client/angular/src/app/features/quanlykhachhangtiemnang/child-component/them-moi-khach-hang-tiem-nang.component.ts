
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhachHangTiemNangService } from '../service/quanlykhachhangtiemnang.service';
import $ from "jquery";

interface Lacbo {
  Id: number;
  CauLacBo: string;
}
@Component({
  selector: 'app-them-moi-khach-hang-tiem-nang',
  templateUrl: './them-moi-khach-hang-tiem-nang.component.html',
  providers: [DialogService]
})

export class ThemMoiKhachHangTiemNangComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa khách hàng tiềm năng';
  HoVaTen: string = '';
  DiaChi: string = '';
  NgheNghiep: string = '';
  SoDienThoai: string = '';
  ZaloFb: string = '';
  NgayCapNhat: any = '';
  isChecked: boolean = true;
  TuKhoa: any = "";
  NhatKy: any = "";
  showImg: boolean = false;
  loading = false;
  file: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};
  data: any = {};
  selectedNguonKhachHang: any = {};
  trangthais: any = {};
  selectedTinhTrang: any = {};
  nguonkhachhangs: any = [];

  gioitinhs: any = {};
  selectedGioiTinh: any = {};

  flagnhatky:  boolean = false;

  selectedCauLacBo: Lacbo;
  caulacbos: Lacbo[];
  caulacbos1: any = [];

  NgayTaoMoi: Date;
  en: any;

  constructor(public activeModal: NgbActiveModal, private khachhangtiemmangservice: QuanLyKhachHangTiemNangService) {

  }
  ngOnDestroy() {
  }

  async ngOnInit() {
    console.log(this.data);
    this.trangthais = [{ Id: '0', TenTinhTrang: 'Chưa tư vấn' }, { Id: '1', TenTinhTrang: 'Đã đặt hẹn' }, { Id: '2', TenTinhTrang: 'Đã đặt hẹn nhưng chưa đến' }, { Id: '3', TenTinhTrang: 'Không đặt được hẹn' }, { Id: '4', TenTinhTrang: 'Đã liên hệ nhiều lần' }, { Id: '5', TenTinhTrang: 'No sale' }, { Id: '6', TenTinhTrang: 'Đã là hội viên' }];
    this.selectedTinhTrang = { Id: '0', TenTinhTrang: 'Chưa tư vấn' };
    this.gioitinhs = [{ Id: '0', TenGioiTinh: 'Nữ' }, { Id: '1', TenGioiTinh: 'Nam' }, { Id: '2', TenGioiTinh: 'Khác' }];
    this.selectedGioiTinh = { Id: '0', TenGioiTinh: 'Nữ' };
    this.GetNguonKhachHang();
    if (this.data.Id != 0) {
      this.flagnhatky = true;
      await this.bindDataEdit();
    }else{
      this.flagnhatky = false;
    }
    
    //this.Title = this.OBJ.Title;
    //this.HoVaTen = this.OBJ.HoVaTen;
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

    if(this.data.NgayTao != '' && this.data.NgayTao != null){
      this.NgayTaoMoi = new Date(this.data.NgayTao);
    }
    this.khachhangtiemmangservice.GetCauLacBo().then((data) => {
      this.caulacbos1 = data
      this.caulacbos = this.caulacbos1;
      // // this.selectedCity = this.cities[0];
      // console.log(this.caulacbos);
      // console.log(this.OBJ.CauLacBoId);
      if(this.data.CauLacBoId > 0){
        this.selectedCauLacBo = this.caulacbos.find(country => country.Id.toString() === this.data.CauLacBoId.toString())
      }
      

      for (let i = 0; i < this.nguonkhachhangs.length; i++) {
        if (this.nguonkhachhangs[i].Id == this.data.NguonKhachHangId) {
          this.selectedNguonKhachHang = this.nguonkhachhangs[i]; break;
        }
      }

    })
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
        //this.imageSrc = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
      this.showImg = true;
      this.file = event.target.files[0];
      //this.AnhDaiDien = '1';   
    }
  }
  removeImg(event: any) {
    $('.preview1').removeClass('it');
    $('.btn-rmv1').removeClass('rmv');
    this.showImg = false;
    //this.imageSrc = '';
    this.file = null;
    //this.AnhDaiDien='';
  }



  Save() {
   
    if (!this.HoVaTen) {
      alert('Bắt buộc nhập'); return;
    }

    let body = {
      Id: this.OBJ.Id,
      TenNguonKhachHang: this.HoVaTen.trim()
    }

    this.activeModal.close();
    this.loading = true;
    if (this.file != null) {
      this.PostImage(body);
    } else {
      this.SaveBody(body);
    }
  }
  async saveData() {
    if (!this.HoVaTen) {
      // alert('Họ và tên bắt buộc nhập'); return;
      this.HoVaTen=''
    }
    if (!this.SoDienThoai) {
      this.SoDienThoai ='';
    } else {
      var PHONENUMBER_REGEXP = /^(0[0-9]{1}|0[0-9]{2})[0-9]{8}$/;
      if (!PHONENUMBER_REGEXP.test(this.SoDienThoai)) {
        alert('Vui lòng nhập đúng định dạng số điện thoại 0xxxxxxxxx'); return;
      }
    }
    let ngaytao = '', caulacboid = 0;
    if (this.NgayTaoMoi != null) {
      ngaytao = this.NgayTaoMoi.getFullYear() + '' + ('0' + (this.NgayTaoMoi.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayTaoMoi.getDate()).substr(-2);
    }
    if (!this.ZaloFb) {
      // alert('Zalo/Fb bắt buộc nhập'); return;
      this.ZaloFb='';
    }
    if (!this.ZaloFb) {
      // alert('Địa chỉ bắt buộc nhập'); return;
      this.ZaloFb='';
    }
    if (!this.NgheNghiep) {
      // alert('Nghề nghiệp bắt buộc nhập'); return;
      this.NgheNghiep='';
    }
    if (!this.NhatKy) {
      this.NhatKy=''
    }
    if(this.selectedCauLacBo != undefined){
      caulacboid = this.selectedCauLacBo.Id;
    }
    let body = {
      Id: this.data.Id,
      HoVaTen: this.HoVaTen,
      DiaChi: this.DiaChi,
      SoDienThoai: this.SoDienThoai,
      GioiTinh: this.selectedGioiTinh.Id,
      TinhTrang: this.selectedTinhTrang.Id,
      NguonKhachHangId: this.selectedNguonKhachHang.Id,
      ZaloFb: this.ZaloFb,
      NgheNghiep: this.NgheNghiep,
      NhatKy: this.NhatKy,
      NgayTao: ngaytao,
      CauLacBoId: caulacboid
    }
    this.SaveBody(body);
  }
  async SaveBody(body) {
    if (this.data.Id == 0) {
      let data = await this.khachhangtiemmangservice.saveData(body);
      this.loading = false;
      this.datasave = data;
      if (this.datasave.errorcode == 0) {
        alert('Thêm mới thành công')
        this.CallBack.emit(true);
        this.activeModal.close();
      } else {
        alert('Thêm mới lỗi')
        return;
      }
    } else {
      let data = await this.khachhangtiemmangservice.updateData(body);
      this.loading = false;
      this.datasave = data;
      if (this.datasave.errorcode == 0) {
        alert('Sửa thành công')
        this.CallBack.emit(true);
        this.activeModal.close();
      } else {
        alert('Sửa lỗi')
        return;
      }
    }
  }

  async PostImage(body) {
    var data = new FormData(); data.append('file', this.file);
    // this.http.post('/api/upload/uploadImage', data).subscribe(d => {
    // let result = d.json();
    //   if(result.ErrorCode==0){
    //     body.AnhDaiDien = result.Link;
    //     this.SaveBody(body);
    //   }
    // })
    // let data1 = await this.camnangservice.upload(data);
    // this.dataupload = data1;
    // if (this.dataupload.errorcode == 0){
    //      body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
    //      this.SaveBody(body);
    // } else {
    //   alert ('Upload ảnh lỗi');
    // }

  }
  bindDataEdit() {
    console.log(this.data.NguonKhachHangId);
    this.HoVaTen = this.data.HoVaTen;
    this.SoDienThoai = this.data.SoDienThoai;
    this.ZaloFb = this.data.ZaloFb;
    this.DiaChi = this.data.DiaChi;
    this.NgheNghiep = this.data.NgheNghiep;
    for (let i = 0; i < this.trangthais.length; i++) {
      if (this.trangthais[i].Id == this.data.TinhTrang) {
        this.selectedTinhTrang = this.trangthais[i]; break;
      }
    }

    for (let i = 0; i < this.gioitinhs.length; i++) {
      if (this.gioitinhs[i].Id == this.data.GioiTinh) {
        this.selectedGioiTinh = this.gioitinhs[i]; break;
      }
    }

    for (let i = 0; i < this.nguonkhachhangs.length; i++) {
      if (this.nguonkhachhangs[i].Id == this.data.NguonKhachHangId) {
        this.selectedNguonKhachHang = this.nguonkhachhangs[i]; break;
      }
    }
  };
  async GetNguonKhachHang() {
    let data = await this.khachhangtiemmangservice.GetNguonKhachHang();
    this.nguonkhachhangs = data;
    this.selectedNguonKhachHang = this.nguonkhachhangs[0];
    // this.selectedNguonKhachHang = this.nguonkhachhangs.find(country => country.Id.toString() === this.OBJ.NguonKhachHangId.toString())
  }





}
