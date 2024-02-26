import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyLichSuService } from '../service/lichsu.service';
import { MessageService } from 'primeng/api';
import { convertDateObjToDMY } from './../../../core/utils/common-functions';
@Component({
  selector: 'app-themmoitapluyen',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiLichSuComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  selectedHoiVien: any = {};
  hoiviens: any = [];
  datasave: any = {};
  NgayTap: any = null;
  Zalofb:string='';
  GhiChu:string = '';
  constructor(public activeModal: NgbActiveModal, private service: QuanLyLichSuService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getListHoiVien();
  }
  async saveData() {
    if (this.selectedHoiVien.Id == -1) {
      alert('Bạn chưa chọn hội viên'); return;
    }
    if (this.NgayTap == null) {
      alert('Bạn chưa chọn ngày tập luyện'); return;
    }
    let now = new Date();
    if (this.NgayTap.getTime() > now.getTime()) {
      alert('Ngày tập luyện không được lớn hơn ngày hiện tại'); return;
    }
    let body = { KhachHangId: this.selectedHoiVien.Id, NgayTap: convertDateObjToDMY(this.NgayTap) }
    let data = await this.service.saveData(body);
    let message = "Thêm mới lịch sử luyện tập thành công";
    if (data['errorcode'] == 0) {
      if (this.data.monan.Id != 0) {
        message = "Chỉnh sửa lịch sử luyện tập thành công";
      }
      alert(message);
      this.CallBack.emit(true);
      this.activeModal.close();
    } else {
      alert(data['message']);
    }
  }





  async getListHoiVien() {
    this.hoiviens = await this.service.GetDanhSachHoiVien();
    let first = {
      Id: -1, ThongTinHoiVien: 'Chọn hội viên: Tên - SDT - Số thẻ'
    }
    this.hoiviens.unshift(first);
    this.selectedHoiVien = first;
    if (this.data.monan.Id != 0) {
      for (let i = 0; i < this.hoiviens.length; i++) {
        if (this.hoiviens[i].Id == this.data.monan.HoiVienId) {
          this.selectedHoiVien = this.hoiviens[i];
          this.Zalofb = this.hoiviens[i].Zalofb;
          this.GhiChu = this.hoiviens[i].GhiChu;
          break;
        }
      }
      let ngaytap = this.data.monan.NgayTapEdit;
      this.NgayTap = new Date(ngaytap);
    } else {
      this.NgayTap = new Date();
    }
  }
  changeHoiVien(e){
    this.GhiChu = e.value.GhiChu;
    this.Zalofb = e.value.Zalofb;
  }
}
