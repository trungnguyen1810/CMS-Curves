import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThucDonThamKhaoService } from '../service/thucdonthamkhao.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-chitietthucdon',
  templateUrl: './chitiet.component.html',
  providers: [MessageService]
})

export class ChiTietThucDonComponent implements OnInit {

  @Input() data;
  Ngay :string ='';
  TenBua :string  = '';
  TongCalo:string = '';
  monans :any = [];

  constructor(public activeModal: NgbActiveModal, private service: ThucDonThamKhaoService, private messageService: MessageService) { }
  ngOnInit(): void { 
    this.Ngay = this.data.monan.Ngay;
    this.TenBua = this.data.monan.TenBua;
    this.TongCalo = this.data.monan.TongCalo;
    this.GetDataChiTiet(this.data.monan.NgayThamKhao,this.data.monan.BuaId);    
  }
  async GetDataChiTiet(Ngay,Bua){
     
     this.monans = await this.service.XemChiTiet(Ngay,Bua);
  }
  
}
