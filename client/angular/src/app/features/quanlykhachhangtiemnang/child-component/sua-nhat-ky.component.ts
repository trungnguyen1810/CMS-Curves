
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyKhachHangTiemNangService } from '../service/quanlykhachhangtiemnang.service';
import $ from "jquery";


@Component({
  selector: 'app-sua-nhat-ky',
  templateUrl: './sua-nhat-ky.component.html',
  providers: [DialogService]
})

export class SuaNhatKyComponent implements OnInit, OnDestroy {
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


  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyKhachHangTiemNangService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    console.log(this.OBJ);
    this.Title = this.OBJ.Title;
    this.NhatKy = this.OBJ.NoiDung;

  };




  Save() {

      if (this.NhatKy == null || this.NhatKy.trim() == '') {
        alert('Nội dung bắt buộc nhập'); return;
      }
      let body = {
        Id: this.OBJ.Id,
        NoiDung: this.NhatKy
      }
      this.SaveBody(body);

  }

  async SaveBody(body) {
    let data = await this.tintucservice.SuaNhatKy(body);
    this.loading = false;
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
        alert('Sửa nhật ký thành công');
        this.CallBack.emit(true);
        this.activeModal.close();
    } else {
      alert('Sửa nhật ký lỗi')
      return;

    }
  }


 

  
}
