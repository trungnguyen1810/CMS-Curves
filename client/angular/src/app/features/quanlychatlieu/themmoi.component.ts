import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyChatLieuService } from './service/quanlychatlieu.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-themmoisize',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiChatLieuComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenSize: string = '';

  constructor(public activeModal: NgbActiveModal, private service: QuanLyChatLieuService, private messageService: MessageService) { }
  ngOnInit(): void {  
  
    if (this.data.thongbao.Id != 0) {
      this.bindDataEdit(this.data.thongbao);
    }

  }
  async saveData() {
    if (!this.TenSize) {
      alert('Tên chất liệu bắt buộc nhập'); return;
    }
      
    
    let body = {
      Id: this.data.thongbao.Id,
      TenSize: this.TenSize
    }
    let data = await this.service.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.CallBack.emit(true);
      this.activeModal.close();
    }
    
  }

  

  
  async bindDataEdit(thongbao) {
    this.TenSize = thongbao.TenChatLieu;
   
  }
}
