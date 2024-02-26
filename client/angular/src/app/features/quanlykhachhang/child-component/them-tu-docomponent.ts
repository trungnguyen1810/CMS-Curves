
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import {ThemMoiSanPhamComponent} from './them-moi-san-pham.component';
import {DanhSachSanPhamDaMuaComponent} from './danh-sach-san-pham-da-mua.component';
import {InHoaDonSanPhamComponent} from './inhoadonsanpham.component';
import {InHoaDonGoiTapComponent} from './inhoadongoitap.component';
import {SuaTuDoComponent} from './sua-tu-do.component';
import {SuaBaoLuuComponent} from './sua-bao-luu.component';
import {ThanhToanGoiTapComponent} from './thanhtoangoitap.component';
import {DanhSachHoaDonComponent} from './danh-sach-hoa-don.component';

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
  NgayThueTu: Date;

  selectedPhongTap: any = {};
  phongtaps: any = [];
  CauLacBoTu: any = '';
  SoTienChuyen: any = '0';
  Isthemtudo: boolean = false;
  Isthongtinhoivien: boolean = true;
  Isbaoluu: boolean = false;
  Ischuyenphongtap: boolean = false;
  IsMuaSanPham :boolean = false;
  minimumDate = new Date();

  type: number = 1;
  SoLuongThem : number;
  GiaTien: String = '';
  HoTen: String = '';
  Phone: String = '';
  TinhTrangTap: String = '';
  tudos:any=[];
  baoluus: any= [];
  tudo : any ={};

  thongtins:any=[];
  thongtin : any ={};
  sanphams:any=[];
  sanpham:any={};
  selectedTuDo: any = {};
  studos: any = [];
  studos1: any = [];
  HinhThucThanhToan: number = 1;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,private tintucservice: QuanLyKhacHangcService) {

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

    this.tintucservice.GetCauLacBo_KhongPhanQuyen().then((data) => {
      this.phongtaps = data;
      this.selectedPhongTap = this.phongtaps[0];

    })



  };


  DanhSachTuDo(TuNgay, DenNgay){
    let body = {
      Id: this.OBJ.Id,
      TuNgay: TuNgay,
      DenNgay: DenNgay
    }

    this.tintucservice.DanhSachTuDoTheoCLB(body).then((data) => {
      this.studos1 = data;
      this.studos= this.studos1.data;
      this.selectedTuDo = this.studos[0];

    });
  }
  async moveDate(event: any) {
    if (event == null ) {
      this.DanhSachTuDo('','');
    } else {
      var NgayBatDau, NgayKetThuc;
      if (this.NgayKetThuc) {
        NgayBatDau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
        NgayKetThuc = this.NgayKetThuc.getFullYear() + '' + ('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThuc.getDate()).substr(-2);
        this.DanhSachTuDo(NgayBatDau,NgayKetThuc);
      }

    };
  }

  async onBlurMethod(event: any) {
    if (event == null) {
      this.DanhSachTuDo('','');
    } else {
      var NgayBatDau, NgayKetThuc;
      if (this.NgayKetThuc) {
        NgayBatDau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
        NgayKetThuc = this.NgayKetThuc.getFullYear() + '' + ('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThuc.getDate()).substr(-2);
        this.DanhSachTuDo(NgayBatDau,NgayKetThuc);
      }
    };
  }
  async moveDate1(event: any) {
    if (event == null ) {
      this.DanhSachTuDo('','');
    } else {
      var NgayBatDau, NgayKetThuc;
      if (this.NgayBatDau) {
        NgayBatDau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
        NgayKetThuc = this.NgayKetThuc.getFullYear() + '' + ('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThuc.getDate()).substr(-2);
        this.DanhSachTuDo(NgayBatDau,NgayKetThuc);
      }

    };
  }

  async onBlurMethod1(event: any) {
    if (event == null) {
      this.DanhSachTuDo('','');
    } else {
      var NgayBatDau, NgayKetThuc;
      if (this.NgayBatDau) {
        NgayBatDau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
        NgayKetThuc = this.NgayKetThuc.getFullYear() + '' + ('0' + (this.NgayKetThuc.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayKetThuc.getDate()).substr(-2);
        this.DanhSachTuDo(NgayBatDau,NgayKetThuc);
      }
    };
  }

  Save() {
    if (this.type == 1) {

    } else if (this.type == 2) {
      let batdau = '', ketthuc = '', ngaythuetu = '';
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
      if(this.selectedTuDo.Id == 0){
        alert('Tủ đồ bắt buộc chọn'); return;
      }
      if (this.GiaTien == null || this.GiaTien.trim() == '') {
        alert('Phải nhập vào tiền thuê theo ngày'); return;
      }
      if (this.NgayThueTu != null) {
        ngaythuetu = this.NgayThueTu.getFullYear() + '' + ('0' + (this.NgayThueTu.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayThueTu.getDate()).substr(-2);
      }else{
        alert('Phải nhập vào ngày thuê tủ đồ'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        TuNgay: batdau,
        DenNgay: ketthuc,
        GiaTien: this.convertMoney(this.GiaTien),
        TuDoId: this.selectedTuDo.Id,
        KhachHangTuDoId: 0,
        HinhThucThanhToan: this.HinhThucThanhToan,
        NgayThueTu: ngaythuetu,
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
        IdBaoLuu: 0,
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
    var btnmuasanpham= document.getElementById("btnmuasanpham");
    if (this.OBJ.HoiVien.IsCLB == '1') {
      if (TabIndex == 1) {
        this.loadthongtin();
        this.Isthemtudo = false;
        this.Isthongtinhoivien = true;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = false;

        btnthongtinkh.className = "btntabclicked";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntab";
      }
      if (TabIndex == 2) {
        this.DanhSachTuDo('','');
        this.loadtudo();
        this.Isthemtudo = true;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = false;

        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntabclicked";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntab";

      }
      if (TabIndex == 3) {
        this.loadtudo();
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = true;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = false;
        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntabclicked";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntab";

      }
      // if (TabIndex == 4) {
      //   alert('Câu lạc bộ không được phép dùng chức năng này');
      //   return;
      // }
      if (TabIndex == 4) {
        this.loadtudo();
        // this.CauLacBoTu = this.OBJ.HoiVien.CauLacBo;
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = true;
        this.IsMuaSanPham = false;
        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnbaoluu.className = "btntab";
        btnmuasanpham.className = "btntab";
        btnchuyenphongtap.className = "btntabclicked";
      }
      if (TabIndex == 5) {
        this.loadDonHangSanPham();
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = true;
        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntabclicked";

      }
    } else {
      if (TabIndex == 1) {
        this.loadthongtin();
        this.Isthemtudo = false;
        this.Isthongtinhoivien = true;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = false;
        btnthongtinkh.className = "btntabclicked";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntab";
      }
      if (TabIndex == 2) {
        alert('Host không được phép dùng chức năng này');
        return;
      }
      if (TabIndex == 3) {
        alert('Host không được phép dùng chức năng này');
        return;
      }
      if (TabIndex == 5) {
        this.loadDonHangSanPham();
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = false;
        this.IsMuaSanPham = true;
        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnchuyenphongtap.className = "btntab";
        btnmuasanpham.className = "btntabclicked";
      }
      if (TabIndex == 4) {
        this.loadtudo();
        // this.CauLacBoTu = this.OBJ.HoiVien.CauLacBo;
        this.Isthemtudo = false;
        this.Isthongtinhoivien = false;
        this.Isbaoluu = false;
        this.Ischuyenphongtap = true;
        this.IsMuaSanPham = false;
        btnthongtinkh.className = "btntab";
        btnthemtudo.className = "btntab";
        btnbaoluu.className = "btntab";
        btnbaoluu.className = "btntab";
        btnmuasanpham.className = "btntab";
        btnchuyenphongtap.className = "btntabclicked";
      }
    }

  }

  async loadthongtin(){
    let body = {
      Id: this.OBJ.Id
    }
    this.tintucservice.DanhSachGoiTapHoiVien(body).then((data) => {
      console.log(data);
      this.thongtin = data;
      this.thongtins= this.thongtin.data.data[1];

      this.HoTen = this.thongtin.data.data[0][0].HoVaTen;
      this.Phone = this.thongtin.data.data[0][0].SoDienThoai;
      this.TinhTrangTap = this.thongtin.data.data[0][0].TinhTrangTap;
      // if (this.tudo.data.data[1] != [] && this.tudo.data.data[1]!= null&& this.tudo.data.data[1]!= ''){
      //   if(this.tudo.data.data[1][0].TuNgay != undefined && this.tudo.data.data[1][0].TuNgay != '' && this.tudo.data.data[1][0].TuNgay != null){
      //     this.NgayBatDauBaoLuu = new Date(this.tudo.data.data[1][0].TuNgay);
      //   }

      //   if(this.tudo.data.data[1][0].DenNgay != undefined && this.tudo.data.data[1][0].DenNgay != '' && this.tudo.data.data[1][0].DenNgay != null){
      //     this.NgayKetThucBaoLuu = new Date(this.tudo.data.data[1][0].DenNgay);
      //   }
      // }


    });
  }

  async loadtudo(){
    let body = {
      Id: this.OBJ.Id
    }
    this.tintucservice.DanhSachThueTuDoTheoHoiVien(body).then((data) => {
      // console.log(this.tudo.data.data[1]);
      this.tudo = data;
      this.tudos= this.tudo.data.data[0];

      this.CauLacBoTu = this.tudo.data.data[2][0].TenCauLacBo;

      this.baoluus= this.tudo.data.data[1];
      // if (this.tudo.data.data[1] != [] && this.tudo.data.data[1]!= null&& this.tudo.data.data[1]!= ''){
      //   if(this.tudo.data.data[1][0].TuNgay != undefined && this.tudo.data.data[1][0].TuNgay != '' && this.tudo.data.data[1][0].TuNgay != null){
      //     this.NgayBatDauBaoLuu = new Date(this.tudo.data.data[1][0].TuNgay);
      //   }

      //   if(this.tudo.data.data[1][0].DenNgay != undefined && this.tudo.data.data[1][0].DenNgay != '' && this.tudo.data.data[1][0].DenNgay != null){
      //     this.NgayKetThucBaoLuu = new Date(this.tudo.data.data[1][0].DenNgay);
      //   }
      // }


    });
  }
  async SaveBody(body) {
    let data = await this.tintucservice.khachhang_tudo_insert(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      if(this.datasave.data.Id == 2){
        alert('Tủ đồ đang có khách hàng đang thuê');
      }else if(this.datasave.data.Id == 1){
        alert('Tủ đồ đang thuê chưa hết hạn, chỉ được thêm tủ đồ mới khi thuê tủ đồ cũ hết hạn');
      }else {
        this.loadtudo();
        alert('Thêm tủ đồ thành công');
        this.CallBack.emit(true);

        this.NgayBatDau = null;
        this.NgayKetThuc = null;
        this.GiaTien = null;
        //this.activeModal.close();
      }
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
        this.loadtudo();
        alert('Bảo lưu thành công')
        // this.CallBack.emit(true);
        // this.NgayBatDauBaoLuu = null;
        // this.NgayKetThucBaoLuu = null;
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
        this.CallBack.emit(true);
        this.loadtudo();
        alert('Chuyển phòng tập thành công')

        this.SoTienChuyen = '0';
        this.tintucservice.GetCauLacBo_KhongPhanQuyen().then((data) => {
          this.phongtaps = data;
          this.selectedPhongTap = this.phongtaps[0];
        })
        window.location.reload();
      } else {
        alert(this.datasave.data[0].ErrorDesc)
      }
      //this.activeModal.close();
    } else {
      alert('Chuyển phòng tập lỗi')
      return;

    }
  }
  async loadDonHangSanPham(){
    let body = {
      KhachHangId: this.OBJ.Id
    }
    this.tintucservice.DanhSachDonHangSanPham(body).then((data) => {
      this.sanpham = data;
      this.sanphams= this.sanpham.data;
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

  EditThemMoiSanPham(sanpham){
    const modalRef = this.modalService.open(ThemMoiSanPhamComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    sanpham.KhachHangId = this.OBJ.Id;
    sanpham.IsCLB = this.OBJ.HoiVien.IsCLB;
    modalRef.componentInstance.data = sanpham;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadDonHangSanPham()}
     );
  }
  EditGoiTap(sanpham){
    const modalRef = this.modalService.open(ThanhToanGoiTapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    sanpham.KhachHangId = this.OBJ.Id;
    sanpham.IsCLB = this.OBJ.HoiVien.IsCLB;
    modalRef.componentInstance.OBJ = sanpham;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadthongtin()}
     );
  }
  DeleteTuDo(data){
    if(this.OBJ.HoiVien.IsCLB=='1'){
     var r = confirm('Bạn có chắc muốn xóa tủ đồ này không ?');
     if(r){
       this.tintucservice.XoaTuDo({Id:data.Id,KhachHangId:this.OBJ.Id});
       alert('Xóa đơn hàng thành công');
       this.loadtudo();
     }
    }else{
     alert('Tài khoản admin không thể thực hiện chức năng này');return;
    }

   }
  EditThemMoiTuDo(tudo){
    const modalRef = this.modalService.open(SuaTuDoComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    tudo.KhachHangId = this.OBJ.Id;
    tudo.IsCLB = this.OBJ.HoiVien.IsCLB;
    modalRef.componentInstance.OBJ = tudo;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadtudo()}
     );
  }
  EditBaoLuu(baoluu){
    const modalRef = this.modalService.open(SuaBaoLuuComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    baoluu.KhachHangId = this.OBJ.Id;
    baoluu.IsCLB = this.OBJ.HoiVien.IsCLB;
    modalRef.componentInstance.OBJ = baoluu;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadtudo()}
     );
  }
  DanhSachSanPhamDaMua(){
    const modalRef = this.modalService.open(DanhSachSanPhamDaMuaComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.KhachHangId = this.OBJ.Id;

  }
  DeleteSanPham(data){
   if(this.OBJ.HoiVien.IsCLB=='1'){
    var r = confirm('Bạn có chắc muốn xóa đơn hàng này không ?');
    if(r){
      this.tintucservice.XoaDonHang({DonHangId:data.Id,KhachHangId:this.OBJ.Id});
      alert('Xóa đơn hàng thành công');
      this.loadDonHangSanPham();
    }
   }else{
    alert('Tài khoản admin không thể thực hiện chức năng này');return;
   }

  }
  InHoaDonSanPham(data){
    const modalRef = this.modalService.open(InHoaDonSanPhamComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.OBJ = data;

  }
  InHoaDonGoiTap(data){
    const modalRef = this.modalService.open(InHoaDonGoiTapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.OBJ = data;
  }
  SuaHoaDon(data){
    const modalRef = this.modalService.open(DanhSachHoaDonComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    data.KhachHangId = this.OBJ.Id;
    modalRef.componentInstance.OBJ = data;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadthongtin()}
     );
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
