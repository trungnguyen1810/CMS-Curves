import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTuDoService } from './service/quanlytudo.service';
import { MessageService } from 'primeng/api';
import { convertDateObjToYMD } from './../../core/utils/common-functions';
import * as $ from 'jquery';
@Component({
  selector: 'app-themmoitudo',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiTuDoComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenCauHinh: string = '';
  GiaThueTheoNgay: number;
  NgayBatDau: any = null;
  NgayKetThuc: any = null;
  caulacbos: any = [];
  // selectedCauLacBo: any = {};

  constructor(public activeModal: NgbActiveModal, private service: QuanLyTuDoService, private messageService: MessageService) { }
  ngOnInit(): void {

    if (this.data.tudo.Id != 0) {
      this.bindDataEdit(this.data.tudo);
    }
    // this.GetCauLacBo(this.data.tudo);

  }

  async saveData() {
    if (!this.TenCauHinh) {
      alert('Tên cấu hình bắt buộc nhập'); return;
    }
    if (!this.GiaThueTheoNgay) {
      alert('Giá thuê theo ngày bắt buộc nhập'); return;
    }
    if (!this.GiaThueTheoNgay) {
      alert('Giá thuê theo ngày bắt buộc nhập'); return;
    }
    // if (!this.selectedCauLacBo.Id || this.selectedCauLacBo.Id  == 0) {
    //   alert('Câu lạc bộ bắt buộc chọn'); return;
    // }
    if (!this.GiaThueTheoNgay) {
      this.GiaThueTheoNgay = 0;
    }
    if (this.GiaThueTheoNgay < 0) {
      alert('Giá giá thuê theo ngày bắt buộc nhập số nguyên dương'); return;
    }
    let body = {
      Id: this.data.tudo.Id,
      TenCauHinh: this.TenCauHinh,
      GiaThueTheoNgay:this.GiaThueTheoNgay,
      // CauLacBoId: this.selectedCauLacBo.Id,
      TuNgay: "",
      DenNgay: ""
    }
    if(this.NgayBatDau == null || this.NgayBatDau == ""){
      alert('Ngày bắt đầu bắt buộc nhập'); return;
    }else{
      body.TuNgay  = convertDateObjToYMD(this.NgayBatDau)
    }
    if(this.NgayKetThuc == null || this.NgayKetThuc == ""){
      alert('Ngày kết thúc bắt buộc nhập'); return;
    }else{
      body.DenNgay  = convertDateObjToYMD(this.NgayKetThuc)
    }
    if(this.NgayBatDau > this.NgayKetThuc){
      alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc'); return;
    }

    // alert(JSON.stringify(body)); return;
    let data = await this.service.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.CallBack.emit(true);
      this.activeModal.close();
    }

  }
  // async GetCauLacBo(tudo) {
  //   if (this.data.CauLacBoId == null) {
  //     this.data.CauLacBoId = -1;
  //   }
  //   let data = await this.service.GetCauLacBo();
  //   this.caulacbos = data;
  //   console.log(this.caulacbos);
  //   this.selectedCauLacBo = this.caulacbos.find(
  //     country => country.Id.toString() === tudo.CauLacBoId.toString(),
  //   );
  // }




  async bindDataEdit(tudo) {
    this.TenCauHinh = tudo.TenCauHinh;
    this.GiaThueTheoNgay = tudo.GiaThueTheoNgay;
    if( tudo.TuNgay != null ){
      this.NgayBatDau = new Date(tudo.TuNgay);
    }
    if( tudo.DenNgay != null ){
      this.NgayKetThuc = new Date(tudo.DenNgay);
    }

  }
}
