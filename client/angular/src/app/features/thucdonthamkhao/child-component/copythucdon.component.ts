import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThucDonThamKhaoService } from '../service/thucdonthamkhao.service';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
@Component({
  selector: 'app-themmoithucdonthamkhaocopy',
  templateUrl: './copythucdon.component.html',
  providers: []
})

export class CopyThucDonComponent implements OnInit {

  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  
  NgayThamKhao1: any = null;
  NgayThamKhao2: any = null;
  constructor(public activeModal: NgbActiveModal, private service: ThucDonThamKhaoService) { }
  ngOnInit(): void {
    this.bindDataNgay();
    
  }
  async saveData() {
    if(!this.NgayThamKhao1){
      alert('Bắt buộc chọn "Từ ngày"');return;
    }
    if(!this.NgayThamKhao2){
      alert('Bắt buộc chọn "Sang ngày"');return;
    }

    if(convertDateObjToYMD(this.NgayThamKhao2)==convertDateObjToYMD(this.NgayThamKhao1)){
      alert('Từ ngày và sang ngày phải khác nhau');return;
    }
    let data = await this.service.CopyThucDon(convertDateObjToYMD(this.NgayThamKhao1),convertDateObjToYMD(this.NgayThamKhao2));
    alert(data['message']);
    if(data['errorcode']==0){

      this.CallBack.emit(true);
      this.activeModal.close();
    }
  }
  bindDataNgay(){
    let now = new Date();
    let now1 = new Date(now.setDate(now.getDate()-1));
    this.NgayThamKhao1 = now1;
    this.NgayThamKhao2 = new Date();
  }
  
}
