import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyLichSuCanDoService } from '../service/quanlylichsucando.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-chitietlichsucando',
  templateUrl: './chitiet.component.html',
  providers: [MessageService]
})

export class ChiTietLichSuCanDoComponent implements OnInit {

  @Input() data;
  Ngay :string ='';
  TenBua :string  = '';
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
  monans :any = [];
  candos :any;

  constructor(public activeModal: NgbActiveModal, private service: QuanLyLichSuCanDoService, private messageService: MessageService) { }
  ngOnInit(): void { 
    console.log(this.data);
    this.GetDataChiTiet(this.data.lichsu);    
  }
  async GetDataChiTiet(Id){
     
     this.monans = await this.service.XemChiTiet(Id);
     this.candos = this.monans.data[0];
     this.NgayCanDo = this.candos.NgayCanDo;
     this.HoVaTen = this.candos.HoVaTen;
     this.CanNang = this.candos.CanNang;
     this.ChieuCao = this.candos.ChieuCao;
     this.LuongMoCoThe = this.candos.LuongMoCoThe;
     this.MatDoXuong = this.candos.MatDoXuong;
     this.MatDoCo = this.candos.MatDoCo;
     this.BMI = this.candos.BMI;
     this.DCI = this.candos.DCI;
     this.TuoiSinhHoc = this.candos.TuoiSinhHoc;
     this.LuongNuocCoThe = this.candos.LuongNuocCoThe;
     this.MoNoiTang = this.candos.MoNoiTang;
     this.Eo = this.candos.Eo;
     this.Bung = this.candos.Bung;
     this.Nguc = this.candos.Nguc;
     this.Mong = this.candos.Mong;
     this.Dui = this.candos.Dui;
     this.Tay = this.candos.Tay;
  }
  
}
