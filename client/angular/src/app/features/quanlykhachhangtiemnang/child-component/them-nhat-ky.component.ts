
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhachHangTiemNangService } from '../service/quanlykhachhangtiemnang.service';
import { SuaNhatKyComponent } from './sua-nhat-ky.component';
import $ from "jquery";


@Component({
  selector: 'app-them-nhat-ky',
  templateUrl: './them-nhat-ky.component.html',
  providers: [DialogService]
})

export class ThemNhatKyComponent implements OnInit, OnDestroy {
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
  minimumDate = new Date();

  type: number = 1;
  SoLuongThem : number;
  GiaTien: String = '';
  tudos:any=[];
  tudo : any ={};
  NhatKy: String  = '';
  dataxoa:any={};
  statuses: any[];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private tintucservice: QuanLyKhachHangTiemNangService) {

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

    this.loadtudo();

    // this.tintucservice.GetCauLacBo().then((data) => {
    //   this.phongtaps = data;
    //   this.selectedPhongTap = this.phongtaps[0];
    //   console.log(data);
    // })



  };


  SuaNhatKy(NhatKy){
    const modalRef = this.modalService.open(SuaNhatKyComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.OBJ = NhatKy;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.loadtudo()}
     );
  }


  Save() {
      let batdau = '';
      if (this.NgayBatDau != null) {
        batdau = this.NgayBatDau.getFullYear() + '' + ('0' + (this.NgayBatDau.getMonth() + 1)).substr(-2) + '' + ('0' + this.NgayBatDau.getDate()).substr(-2);
      } else {
        alert('Thời gian bắt buộc nhập'); return;
      }

      if (this.NhatKy == null || this.NhatKy.trim() == '') {
        alert('Nội dung bắt buộc nhập'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        ThoiGian: batdau,
        NoiDung: this.NhatKy
      }
      this.SaveBody(body);

  }



  async loadtudo(){
    let body = {
      Id: this.OBJ.Id
    }
    this.tintucservice.DanhSachNhatKyTheoHoiVien(body).then((data) => {

      console.log(data);
      this.tudo = data;
      this.tudos= this.tudo.data.data[0];
      

    });
  }
  async SaveBody(body) {
    let data = await this.tintucservice.ThemNhatKy(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      if(this.datasave.data.Id == 1){
        alert('Đã thêm nhật ký trong thời gian này');
      }else {
        this.loadtudo();
        alert('Thêm nhật ký thành công');
        this.CallBack.emit(true);
        this.NgayBatDau = null;
        this.NhatKy = null;
        //this.activeModal.close();
      }
    } else {
      alert('Thêm nhật ký lỗi')
      return;

    }
  }

  
  async delete(nhatky){
    console.log(nhatky);
    var r = confirm("Bạn có chắc muốn xóa nhật ký này không ?");
    if (r == true) {
      let data =  await this.tintucservice.XoaDiemCham(nhatky);
      this.dataxoa = data;
       if (this.dataxoa.errorcode == 0) {
          alert('Xóa thành công')
          this.loadtudo();
       } else {
          alert('Xóa lỗi')
        return;
    
      }
    }
  
  }

 

  
}
