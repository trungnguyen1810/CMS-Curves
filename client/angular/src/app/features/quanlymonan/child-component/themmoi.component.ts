import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyMonAnService } from '../service/quanlymonan.service';
import { MessageService } from 'primeng/api';
import{IsFloat} from './../../../core/utils/common-functions';
@Component({
  selector: 'app-themmoinhanvien',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemmoiMonAnComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenMonAn: string = '';
  MoTa: string = '';
  Calo: string = '';
  selectedDonVi: any = {};
  donvis: any = [];
  datasave: any = {};

  constructor(public activeModal: NgbActiveModal, private monanervice: QuanLyMonAnService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.GetDonVi();
    if (this.data.monan.Id != 0) {
      this.bindDataEdit(this.data.monan);
    }

  }
  async saveData() {
    if (!this.TenMonAn) {
      alert('Tên món ăn bắt buộc nhập'); return;
    }
    
    if (!this.Calo) {
      this.Calo = '0';
    }
    if(Number(this.Calo)<0){
      alert('Calo bắt buộc nhập lớn hơn hoặc bằng 0'); return;
    }
    if(IsFloat(this.Calo).Error!=0){
      alert('Calo bắt buộc nhập đúng định dạng số thập phân,ví dụ : 200.40'); return;
    }

    var mota = '';
    if (this.MoTa) {
      mota = this.MoTa;
    }

    let body = {
      Id: this.data.monan.Id,
      TenMonAn: this.TenMonAn,
      DonViId: this.selectedDonVi.Id,
      Calo: this.Calo,
      MoTa: mota
    } 

    let data = await this.monanervice.saveData(body);
    this.datasave = data;
    if (this.datasave.errorcode == 0) {
      if (this.data.monan.Id == 0) {
        alert('Thêm mới thành công');
      } else {
        alert('Sửa thành công');
      }
      this.CallBack.emit(true);
      this.activeModal.close();
    }else{
      alert (this.datasave.message);return;
    }
    
  }

 


  async bindDataEdit(monan) {
    this.TenMonAn = monan.TenMonAn;  
    this.Calo = monan.Calo;
    this.MoTa = monan.MoTa;
  }
  async GetDonVi(){
    let data = await this.monanervice.getDonVi();
    this.donvis = data;
    if (this.data.monan.Id == 0) {
      this.selectedDonVi = this.donvis[0];
    } else {
      for (let i = 0; i < this.donvis.length; i++) {
        if (this.donvis[i].Id == this.data.monan.DonViKhoiLuongId) {
          this.selectedDonVi = this.donvis[i]; break;
        }
      }
    }
  }
  close(){
    this.activeModal.close();
    this.CallBack.emit(false);
  }
  onPressCalo(evt){
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
}
