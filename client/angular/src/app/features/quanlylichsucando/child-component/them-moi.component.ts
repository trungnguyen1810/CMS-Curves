
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyLichSuCanDoService } from '../service/quanlylichsucando.service';
import $ from "jquery";
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { convertDateObjToDMY } from './../../../core/utils/common-functions';

interface City {
  Id: number;
  TenDiaBan: string;
}
@Component({
  selector: 'app-them',
  templateUrl: './them-moi.component.html',
  providers: [DialogService, MessageService]
})

export class ThemMoiComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa lịch sử cân đo';
  TieuDe: string = '';
  Ngay :string ='';
  SoDienThoai :string  = '';
  TongCalo:string = '';
  HoVaTen:string = '';
  CanNang:string = '';
  ChieuCao:string = '';
  LuongMoCoThe:string = '';
  MatDoCo:string = '';
  MatDoXuong:string = '';
  BMI:string = '';
  DCI:string = '';
  TuoiSinhHoc:string = '';
  LuongNuocCoThe:string = '';
  MoNoiTang:string = '';
  Nguc:string = '';
  Eo:string = '';
  Bung:string = '';
  Mong:string = '';
  Dui:string = '';
  Tay:string = '';
  NgayCanDo:string = '';

  loading = false;
  password = true;
  datasave: any = {};

  selectedHoiVien: any = {};
  hoiviens: any = [];
  NgayTap: any = null;
  Zalofb:string='';
  GhiChu:string = '';
  SoDienThoaiCanDo:string = '';

  constructor(public activeModal: NgbActiveModal, private caulacboservice: QuanLyLichSuCanDoService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    this.getListHoiVien();
    if (this.OBJ.Id != 0) {
      this.password = false;
    }

    console.log(this.OBJ);
    // if (this.OBJ.Id == 0) {
    //   this.password = true;
    //   $('.nguoidung').removeClass('header');
    // } else {
    //   this.password = false;
    //   $('.nguoidung').addClass('header');
    // }
   

    // if(this.OBJ.TinhThanhId == null){
    //   this.OBJ.TinhThanhId = 0;
    //  }

  
    this.primengConfig.ripple = true;
    this.Title = this.OBJ.Title;
    this.SoDienThoai = this.OBJ.SoDienThoai;
    this.CanNang = this.OBJ.CanNang;
    this.ChieuCao = this.OBJ.ChieuCao;
    this.LuongMoCoThe = this.OBJ.LuongMoCoThe;
    this.MatDoCo = this.OBJ.MatDoCo;
    this.MatDoXuong = this.OBJ.MatDoXuong;
    this.BMI = this.OBJ.BMI;
    this.DCI = this.OBJ.DCI;
     
    this.TuoiSinhHoc = this.OBJ.TuoiSinhHoc;
    this.LuongNuocCoThe = this.OBJ.LuongNuocCoThe;
    this.MoNoiTang = this.OBJ.MoNoiTang;
    this.Nguc = this.OBJ.Nguc;
    this.Eo = this.OBJ.Eo;
    this.Bung = this.OBJ.Bung;
    this.Mong = this.OBJ.Mong;
    this.Dui = this.OBJ.Dui;
    this.Tay = this.OBJ.Tay;
    // if (this.OBJ.AnhDaiDien != '' && this.OBJ.AnhDaiDien != null) {
    //   this.showImg = true;
    //   $('.preview1').addClass('it');
    //   $('.btn-rmv1').addClass('rmv');
    // }
  };

  async getListHoiVien() {
    this.hoiviens = await this.caulacboservice.GetDanhSachHoiVien();
    let first = {
      Id: -1, ThongTinHoiVien: 'Chọn hội viên: Tên - SDT - Số thẻ'
    }
    this.hoiviens.unshift(first);
    this.selectedHoiVien = first;
    if (this.OBJ.Id != 0) {
      for (let i = 0; i < this.hoiviens.length; i++) {
        if (this.hoiviens[i].Id == this.OBJ.KhachHangId) {
          this.selectedHoiVien = this.hoiviens[i];
          this.Zalofb = this.hoiviens[i].Zalofb;
          this.GhiChu = this.hoiviens[i].GhiChu;
          break;
        }
      }
      let ngaytap = this.OBJ.NgayCanDo;
      this.NgayTap = new Date(ngaytap);
    } else {
      this.NgayTap = new Date();
    }
  }

  
  changeHoiVien(e){
    this.SoDienThoaiCanDo = e.value.SoDienThoai;
    this.GhiChu = e.value.GhiChu;
    this.Zalofb = e.value.Zalofb;
  }

 


  async Save() {
    if (this.selectedHoiVien.Id == -1) {
      this.showWarn('Bạn chưa chọn hội viên'); return;
    }
    // if (!this.SoDienThoai.trim()) {
    //   this.showWarn('Số điện thoại bắt buộc nhập'); return;
    // }
    // if (this.IsPhone(this.SoDienThoai.trim()) == false) {
    //   this.showWarn('Số điện thoại sai định dạng'); return;
    // }
    if (!this.ChieuCao.trim()) {
      this.showWarn('Chiều cao bắt buộc nhập'); return;
    }
    if (!this.CanNang.trim()) {
      this.showWarn('Cân nặng bắt buộc chọn'); return;
    }
    if (!this.BMI.trim()) {
      this.showWarn('BMI bắt buộc nhập'); return;
    }
    
    if (this.NgayTap == null) {
      alert('Bạn chưa chọn ngày cân đo'); return;
    }
    let now = new Date();
    if (this.NgayTap.getTime() > now.getTime()) {
      alert('Ngày cân đo không được lớn hơn ngày hiện tại'); return;
    }


    let body = {
      Id: this.OBJ.Id,
      SoDienThoai: this.SoDienThoaiCanDo,
      CanNang: this.CanNang.trim(),
      ChieuCao: this.ChieuCao.trim(),
      LuongMoCoThe: this.LuongMoCoThe.trim(),
      MatDoCo: this.MatDoCo.trim(),
      MatDoXuong: this.MatDoXuong,
      BMI: this.BMI.trim(),
      DCI: this.DCI.trim(),
      TuoiSinhHoc: this.TuoiSinhHoc.trim(),
      LuongNuocCoThe: this.LuongNuocCoThe.trim(),
      MoNoiTang: this.MoNoiTang.trim(),
      Nguc: this.Nguc.trim(),
      Eo: this.Eo.trim(),
      Bung: this.Bung.trim(),
      Mong: this.Mong.trim(),
      Dui: this.Dui.trim(),
      Tay: this.Tay.trim(),
      NgayCanDo: convertDateObjToDMY(this.NgayTap)
    }
    // console.log(body);
    let data = await this.caulacboservice.save(body);
    this.loading = false;
    this.datasave = data;
    console.log(data)
    if (this.datasave.data[0].errorcode == 0) {
        alert(this.datasave.data[0].message);
      

      this.CallBack.emit(true);
      this.activeModal.close();
    } else {
      alert(this.datasave.data[0].message);
      return;

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
