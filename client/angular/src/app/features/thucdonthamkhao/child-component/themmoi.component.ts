import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThucDonThamKhaoService } from '../service/thucdonthamkhao.service';
import { MessageService } from 'primeng/api';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
@Component({
  selector: 'app-themmoithucdonthamkhao',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemmoiThucDonComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  selectedNgay: any = {};
  selectedBua: any = {};
  ngays: any = [];
  buas: any = [];
  datasave: any = {};
  monans: any = [];
  danhsachmonans: any = [];
  selectedMonAn: any = {};
  TongCong: number = 0;
  SoLuong: any = [];
  NgayThamKhao: any = null;
  CurrentBuaId :number=0;
  constructor(public activeModal: NgbActiveModal, private service: ThucDonThamKhaoService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.bindDataNgay();
    this.GetDanhSachMonAn();
  }
  async saveData() {
    if (this.monans.length == 0) {
      alert('Bạn chưa chọn món ăn'); return;
    }
    if(this.selectedBua.Id<0){
      alert('Bạn chưa chọn bữa ăn,hoặc bữa ăn tương ứng với ngày đã chọn chưa được thiết lập');return;
    }
    let body = { 
      IsAdd: 1,
      Ngay: convertDateObjToYMD(this.NgayThamKhao),
      BuaId: this.selectedBua.Id,
      ListMonAnId: [],
      SoLuong: [],
      CurrentBuaId:0
    }
    if (this.data.thucdon.Ngay != null) {
      body.IsAdd = 0;
      body.CurrentBuaId = this.CurrentBuaId;
    }
    for (let i = 0; i < this.monans.length; i++) {
      body.ListMonAnId.push(this.monans[i].Id);
      body.SoLuong.push(this.SoLuong[i].value);
    }
    let data = await this.service.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.activeModal.close();
      this.CallBack.emit(true);
    }
  }
  bindDataNgay() {    
    if (this.data.thucdon.Ngay != null) {
      this.NgayThamKhao = new Date(this.data.thucdon.NgayThamKhao);
    } else {
      this.NgayThamKhao = new Date();
    }
    this.bindDataBua(this.NgayThamKhao);
  }
  async bindDataBua(NgayThamKhao) {
    let data = await this.service.GetDanhSachBuaAnTheoNgay(convertDateObjToYMD(NgayThamKhao));
    this.buas = data;
    this.buas.unshift({Id:-1,TenBuaAn:'---Chọn bữa ăn---'})
    this.selectedBua = this.buas[0];
    // this.buas.push({ Id: 1, TenBua: 'Bữa sáng' });
    // this.buas.push({ Id: 2, TenBua: 'Bữa phụ(sáng)' });
    // this.buas.push({ Id: 3, TenBua: 'Bữa trưa' });
    // this.buas.push({ Id: 4, TenBua: 'Bữa phụ(chiều)' });
    // this.buas.push({ Id: 5, TenBua: 'Bữa tối' });
    if (this.data.thucdon.Ngay !=null) {
      for (let i = 0; i < this.buas.length; i++) {
        if (this.buas[i].Id == this.data.thucdon.BuaId) {
          this.CurrentBuaId = this.buas[i].Id;
          this.selectedBua = this.buas[i]; break;
        }
      }
    }
  }
  ThemMon() {
    if (this.selectedMonAn.Id > 0) {
      let check = true;
      for (let i = 0; i < this.monans.length; i++) {
        if (this.monans[i].Id == this.selectedMonAn.Id) {
          check = false;
        }
      }
      if (check) {
        this.selectedMonAn.TongCalo = this.selectedMonAn.Calo;
        this.monans.push(this.selectedMonAn);
        this.SoLuong.push({ value: 1 });
        this.TinhTongCalo();
      }

    } else {
      alert('Vui lòng chọn món ăn'); return;
    }
  }


  async GetDanhSachMonAn() {
    this.danhsachmonans = await this.service.getDanhSachMonAn();
    this.danhsachmonans.unshift({ Id: -1, TenMonAn: 'Chọn món ăn' });
    this.selectedMonAn = this.danhsachmonans[0];
    if(this.data.thucdon.Ngay!=null){
      await this.GetListMonAnEdit(this.data.thucdon.NgayThamKhao,this.data.thucdon.BuaId)
    }
  }
  onPressSoLuong(evt) {
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
  ChangeSoLuong(index) {
    if (this.SoLuong[index].value > 9999) {

      this.SoLuong[index].value = 9999;
    }
    this.monans[index].TongCalo = this.monans[index].Calo * this.SoLuong[index].value;
    this.TinhTongCalo();
  }
  XoaMonAn(index) {
    this.monans.splice(index, 1);
    this.SoLuong.splice(index, 1);
    this.TinhTongCalo();
  }
  TinhTongCalo() {
    let total = 0;
    for (let i = 0; i < this.monans.length; i++) {
      total += this.monans[i].Calo * this.SoLuong[i].value;
    }
    this.TongCong = total;
  }
  async GetListMonAnEdit(Ngay,BuaId){
    let data  = await this.service.getDanhSachMonAnEdit(Ngay,BuaId);
    this.SoLuong = [];
    this.monans=[];
    for(let i=0;i<data['length'];i++){
      let sl = data[i].SoLuong
      this.SoLuong.push({value:sl});
      for(let j=0;j<this.danhsachmonans.length;j++){
        if(this.danhsachmonans[j].Id == data[i].MonAnId){
          let obj = this.danhsachmonans[j];
          obj.TongCalo = sl * this.danhsachmonans[j].Calo;
          this.monans.push(obj);
        }        
      }
    }
    this.TinhTongCalo();

  }
  onSelectNgay(e){
    this.bindDataBua(this.NgayThamKhao);   
  }
}
