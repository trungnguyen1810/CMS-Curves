
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyNhuongQuyenService } from '../service/quanlynhuongquyen.service';
import $ from "jquery";


@Component({
  selector: 'app-them-moi-nhuong-quyen',
  templateUrl: './them-moi-nhuong-quyen.component.html',
  providers: [DialogService]
})

export class ThemMoiNhuongQuyenComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  TenNhuongQuyen: string = '';
  MaNhuongQuyen: string = '';
  MaCauHinh: string = '';
  TyLe: string = '';
  GiaTien: string = '';
  tintuc: number = 0;
  HienThi: boolean = false;
  TomTat: string = '';
  NoiDung: string = '';
  imageSrc: string = '';
  AnhDaiDien: string = '';
  NgayCapNhat: any = '';
  TuKhoa: any = "";
  showImg: boolean = false;
  loading = false;
  file: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};
  password: boolean = true;
  ThoiHanGoiTap: Date;
  SoLuong: number = 0;
  selectedDonViTinh: any = {};
  donvitinhs: any = [];
  en: any;

  constructor(public activeModal: NgbActiveModal, private nhuongquyenservice: QuanLyNhuongQuyenService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    var item = [{
      Id: 1, Ten: "Ngày"
    }, {
      Id: 2, Ten: "Tháng"
    }, {
      Id: 3, Ten: "Năm"
    }
    ]
    this.donvitinhs = item;
    this.selectedDonViTinh = this.donvitinhs[0];
    if (this.OBJ.Id == 0) {
      this.password = true;
    } else {
      this.password = false;
    }
    this.Title = this.OBJ.Title;
    this.tintuc = this.OBJ.tintuc;
    this.TenNhuongQuyen = this.OBJ.TenNhuongQuyen;
    this.MaNhuongQuyen = this.OBJ.MaNhuongQuyen;
    this.MaCauHinh = this.OBJ.MaCauHinh;
    this.TyLe = this.OBJ.TyLe;
    // this.GiaTien = this.OBJ.GiaTien;
    if(this.OBJ.GiaTien){
      this.GiaTien = this.convertNumberToMoney(this.OBJ.GiaTien);
    }
    
    this.AnhDaiDien = this.OBJ.AnhDaiDien;
    this.NoiDung = this.OBJ.NoiDung;
    this.HienThi = this.OBJ.TinhTrang ? true : false;
    this.imageSrc = this.OBJ.AnhDaiDien;
    this.SoLuong = this.OBJ.SoLuong;
    if (this.OBJ.ThoiHanGoiTap != "") {
      this.ThoiHanGoiTap = new Date(this.OBJ.ThoiHanGoiTap);
    }
    if (this.OBJ.AnhDaiDien != '' && this.OBJ.AnhDaiDien != null) {
      this.showImg = true;
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
    }

    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
      dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };

    for (let i = 0; i < this.donvitinhs.length; i++) {
      if (this.donvitinhs[i].Id == this.OBJ.DonVi) {
        this.selectedDonViTinh = this.donvitinhs[i]; break;
      }
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
    if (!this.MaNhuongQuyen) {
      alert('Mã chức năng bắt buộc nhập'); return;
    }

    if (!this.TenNhuongQuyen) {
      alert('Tên cấu hình bắt buộc nhập'); return;
    }

    if (!this.NoiDung.trim()) {
      alert('Nội dung bắt buộc nhập'); return;
    }

    if (this.MaNhuongQuyen.trim() == 'GOITAP' && !this.TyLe.toString().trim()) {
      alert('Tỷ lệ giảm giá gói tập bắt buộc nhập'); return;
    }

    if (this.TyLe && this.IsPhone(this.TyLe) == false) {
      alert('Tỷ lệ sai định dạng'); return;
    }

    if (this.MaNhuongQuyen.trim() == 'GOITAP' && !this.GiaTien.toString().trim()) {
      alert('Giá tiền gói tập bắt buộc nhập'); return;
    }

    // if (this.GiaTien && this.IsPhone(this.GiaTien) == false) {
    //   alert('Giá tiền sai định dạng'); return;
    // }

    if(this.MaNhuongQuyen.trim() == 'GOITAP' && this.SoLuong <= 0){
      alert('Thời gian gói tập phải lớn hơn 0');return;
    }

    // if(this.MaNhuongQuyen.trim() == 'GOITAP' && this.ThoiHanGoiTap){
    //   let TuNgay = new Date();
    //   let DenNgay = new Date(this.ThoiHanGoiTap);
    //   TuNgay = new Date(TuNgay.getFullYear(), TuNgay.getMonth(), TuNgay.getDate());
    //   DenNgay = new Date(DenNgay.getFullYear(), DenNgay.getMonth(), DenNgay.getDate());
    //   if(TuNgay > DenNgay) {
    //     alert('Vui lòng nhập thời hạn gói tập lớn hơn thời gian hiện tại');return;
    //     // this.showWarn('Vui lòng nhập ngày bắt đầu ưu đãi nhỏ hơn hoặc bằng ngày kết thúc ưu đãi'); return;
    //   }
    // }

    let tyle = '', giatien = '';
    if (this.MaNhuongQuyen.trim() == 'GOITAP' && this.TyLe.toString().trim()) {
      tyle = this.TyLe;
    }

    if (this.MaNhuongQuyen.trim() == 'GOITAP' && this.GiaTien.toString().trim()) {
      giatien = this.convertMoney(this.GiaTien);
    }

    // let thoihangoitap = '' 
    // if(this.ThoiHanGoiTap != null){
    //   thoihangoitap = this.ThoiHanGoiTap.getFullYear()+''+('0' + (this.ThoiHanGoiTap.getMonth() + 1)).substr(-2)+''+('0' +this.ThoiHanGoiTap.getDate()).substr(-2);
    // }



    let body = {
      Id: this.OBJ.Id,
      MaNhuongQuyen: this.MaNhuongQuyen.trim(),
      TenNhuongQuyen: this.TenNhuongQuyen.trim(),
      TinhTrang: this.HienThi ? 1 : 0,
      NoiDung: this.NoiDung,
      AnhDaiDien: this.AnhDaiDien,
      TyLe: tyle,
      GiaTien: giatien,
      SoLuong: this.SoLuong,
      DonVi: this.selectedDonViTinh.Id
    }

    this.activeModal.close();
    this.loading = true;
    if (this.file != null) {
      this.PostImage(body);
    } else {
      this.SaveBody(body);
    }
  }
  async SaveBody(body) {
    let data = await this.nhuongquyenservice.saveData(body);
    this.loading = false;
    this.datasave = data;
    console.log(data)
    if (this.datasave.errorcode == 0) {
      if (this.OBJ.Id == 0) {
        alert('Thêm mới thành công')
      } else {
        alert('Sửa thành công')
      }

      this.CallBack.emit(true);
      this.activeModal.close();
    } else {
      if (this.OBJ.Id == 0) {
        alert('Thêm mới lỗi')
      } else {
        alert('Sửa lỗi')
      }
      return;

    }
  }

  async PostImage(body) {
    var data = new FormData(); data.append('file', this.file);
    let data1 = await this.nhuongquyenservice.upload(data);
    this.dataupload = data1;
    if (this.dataupload.errorcode == 0) {
      body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
      this.SaveBody(body);
    } else {
      alert('Upload ảnh lỗi');
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
