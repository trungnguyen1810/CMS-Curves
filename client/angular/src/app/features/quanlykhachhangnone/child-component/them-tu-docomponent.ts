
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhachHangNoneService } from '../service/quanlykhachhangnone.service';
import $ from "jquery";


@Component({
  selector: 'app-them-tu-do',
  templateUrl: './them-tu-do.component.html',
  providers: [DialogService]
})

export class ThemTuDoComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  MatKhau: string = '';
  NhapLaiMatKhau: string = '';
  password: boolean = true;
  showImg: boolean = false;
  showImg2: boolean = false;
  loading = false;
  file: any = null;
  file2: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};
  NgayBatDau: Date;
  NgayKetThuc: Date;
  en: any;


  NgayBatDauBaoLuu: Date;
  NgayKetThucBaoLuu: Date;

  selectedPhongTap: any = {};
  phongtaps: any = [];
  CauLacBoTu: any = '';
  SoTienChuyen: any = '0';
  Isthemtudo: boolean = false;
  Isthongtinhoivien: boolean = true;
  Isbaoluu: boolean = false;
  Ischuyenphongtap: boolean = false;

  type: number = 1;
  SoLuongThem : number;

  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyKhachHangNoneService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {

    this.Title = this.OBJ.Title;
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
    this.ChangeTab(1);

    this.tintucservice.GetCauLacBo().then((data) => {
      this.phongtaps = data;
      this.selectedPhongTap = this.phongtaps[0];
      console.log(data);
    })



  };




  Save() {
    if (this.type == 1) {

    } else if (this.type == 2) {
      let batdau = '', ketthuc = '';
      if (this.NgayBatDau != null) {
        batdau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
      } else {
        alert('Từ ngày bắt buộc nhập'); return;
      }

      if (this.NgayKetThuc != null) {
        ketthuc = this.NgayKetThuc.getFullYear() + '' + ('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThuc.getDate()).substr(-2);
      } else {
        alert('Đến ngày bắt buộc nhập'); return;
      }
      if (batdau >= ketthuc) {
        alert('Từ ngày phải nhỏ hơn đến ngày'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        TuNgay: batdau,
        DenNgay: ketthuc
      }
      this.SaveBody(body);
    } else if (this.type == 3) {
      let batdau = '', ketthuc = '';
      if (this.NgayBatDauBaoLuu != null) {
        batdau = this.NgayBatDauBaoLuu.getFullYear() + '' + ('0' + (this.NgayBatDauBaoLuu.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDauBaoLuu.getDate()).substr(-2);
      } else {
        alert('Từ ngày bắt buộc nhập'); return;
      }

      if (this.NgayKetThucBaoLuu != null) {
        ketthuc = this.NgayKetThucBaoLuu.getFullYear() + '' + ('0' + (this.NgayKetThucBaoLuu.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThucBaoLuu.getDate()).substr(-2);
      } else {
        alert('Đến ngày bắt buộc nhập'); return;
      }
      if (batdau >= ketthuc) {
        alert('Từ ngày phải nhỏ hơn đến ngày'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        TuNgay: batdau,
        DenNgay: ketthuc
      }
      this.SaveBodyBaoLuu(body);
    } else if (this.type == 4) {
      if(this.selectedPhongTap.Id == '0'){
        alert('Câu lạc bộ đến bắt buộc chọn'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        clbDen: this.selectedPhongTap.Id,
        SoTien: this.SoTienChuyen
      }
      this.SaveBodyChuyenPhongTap(body);
    }

  }

  ChangeTab(TabIndex) {
    this.NgayBatDau = null;
    this.NgayKetThuc = null;
    this.NgayBatDauBaoLuu = null;
    this.NgayKetThucBaoLuu = null;

    this.type = TabIndex;
    var btnthongtinkh = document.getElementById("btnthongtinkh");
    var btnthemtudo = document.getElementById("btnthemtudo");
    var btnbaoluu = document.getElementById("btnbaoluu");
    var btnchuyenphongtap = document.getElementById("btnchuyenphongtap");
    console.log(this.OBJ.HoiVien);
    if (this.OBJ.HoiVien.IsCLB == '1') {
      if (TabIndex == 1) {
        this.Isthemtudo = false;
        this.Isthongtinhoivien = true;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;

        btnthongtinkh.className = "btntabclicked";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
      }
      if (TabIndex == 2) {
        this.Isthemtudo = true;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;

        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntabclicked";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
      }
      if (TabIndex == 3) {
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = true;
        this.Ischuyenphongtap = false;

        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntabclicked";
        btnchuyenphongtap.className = "btntab";
      }
      if (TabIndex == 4) {
        alert('Câu lạc bộ không được phép dùng chức năng này');
        return;
      }
    } else {
      if (TabIndex == 1) {
        this.Isthemtudo = false;
        this.Isthongtinhoivien = true;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;

        btnthongtinkh.className = "btntabclicked";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
      }
      if (TabIndex == 2) {
        alert('Host không được phép dùng chức năng này');
        return;
      }
      if (TabIndex == 3) {
        alert('Host không được phép dùng chức năng này');
        return;
      }
      if (TabIndex == 4) {
        this.CauLacBoTu = this.OBJ.HoiVien.CauLacBo;
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = true;

        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntabclicked";
      }
    }

  }
  async SaveBody(body) {
    let data = await this.tintucservice.khachhang_tudo_insert(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      alert('Thêm tủ đồ thành công');
      this.CallBack.emit(true);
      this.NgayBatDau = null;
      this.NgayKetThuc = null;
      //this.activeModal.close();
    } else {
      alert('Thêm tủ đồ lỗi')
      return;

    }
  }

  async SaveBodyBaoLuu(body) {
    let data = await this.tintucservice.khachhang_baoluu_inser(body);
    this.loading = false;
    this.datasave = data;
    console.log(this.datasave);
    if (this.datasave.errorcode == 0) {
      if (this.datasave.data[0].ErrorCode == '0') {
        alert('Bảo lưu thành công')
        this.CallBack.emit(true);
        this.NgayBatDauBaoLuu = null;
        this.NgayKetThucBaoLuu = null;
      } else {
        alert(this.datasave.data[0].ErrorDesc)
      }
      //this.activeModal.close();
    } else {
      alert('Bảo lưu lỗi')
      return;

    }
  }

  async SaveBodyChuyenPhongTap(body) {
    let data = await this.tintucservice.khachang_chuyenphongtap_inser(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      if (this.datasave.data[0].ErrorCode == '0') {
        alert('Chuyển phòng tập thành công')
        this.CallBack.emit(true);
        this.SoTienChuyen = '0';
        this.tintucservice.GetCauLacBo().then((data) => {
          this.phongtaps = data;
          this.selectedPhongTap = this.phongtaps[0];
        })
      } else {
        alert(this.datasave.data[0].ErrorDesc)
      }
      //this.activeModal.close();
    } else {
      alert('Chuyển phòng tập lỗi')
      return;

    }
  }
}
