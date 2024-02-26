import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyColorService } from './service/quanlycolor.service';
import { MessageService } from 'primeng/api';
import * as $ from 'jquery';
@Component({
  selector: 'app-themmoicolor',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiColorComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenMau: string = '';
  MaMau: string = '';

  constructor(public activeModal: NgbActiveModal, private service: QuanLyColorService, private messageService: MessageService) { }
  ngOnInit(): void {  
  
    if (this.data.thongbao.Id != 0) {
      this.bindDataEdit(this.data.thongbao);
    }

  }
  
  async saveData() {
    if (!this.TenMau) {
      alert('Tên màu sắc bắt buộc nhập'); return;
    }
    
  this.MaMau = $("#bodycolor").val();
    if (!this.MaMau) {
      alert('Mã màu bắt buộc nhập'); return;
    }
    
    let body = {
      Id: this.data.thongbao.Id,
      TenMau: this.TenMau,
      MaMau:this.MaMau
    }
    let data = await this.service.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.CallBack.emit(true);
      this.activeModal.close();
    }
    
  }

  

  
  async bindDataEdit(thongbao) {
    this.TenMau = thongbao.TenMau;
    this.MaMau = thongbao.MaMau;
    document.getElementById('bodycolor')['value']=thongbao.MaMau;

  }
}
