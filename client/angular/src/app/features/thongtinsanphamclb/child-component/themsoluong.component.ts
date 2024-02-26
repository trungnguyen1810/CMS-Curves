import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLySanPhamService } from '../service/quanlysanpham.service';
import { MessageService } from 'primeng/api';
import { SelectItem, PrimeNGConfig } from "primeng/api";


@Component({
  selector: 'app-themsoluong',
  templateUrl: './themsoluong.component.html',
  providers: [MessageService]
})

export class ThemSoLuongComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenDanhMuc: string = '';
  isChecked: boolean = true;
  isChecked_ConHang :boolean=true;
  imageSrc: string = '';
  AnhDaiDien: string = '';
  AnhChiTiet: string = '';
  showImg: boolean = false;
  file: any = null;
  dataupload: any = {};
  selectedNhomSanPham: any = {};
  nhomsanphams: any = [];

  TenSanPham: string = '';
  SoLuongThem: number = 0;
  SoLuongBot: number = 0;
  SoLuong: number = 0;

  Gia: number = 0;
  MoTa: string = '';
  urls = [];
  showurls: any = [];
  file_chitiets: any = [];

  sizes: any = [];
  selectedColors:any = [];

  selectedSizes:any = [];
  colors: MauSac[];
  chatlieus:any=[];
  selectedChatlieus:any = [];

  constructor(public activeModal: NgbActiveModal, private sanphamservice: QuanLySanPhamService, private messageService: MessageService,private primengConfig: PrimeNGConfig) {

  }
  async ngOnInit() {
    this.primengConfig.ripple = true;
    await this.bindDataEdit();
    console.log(this.data.sanpham);
  }

  async saveData() {
    if (!this.SoLuongThem) {
      this.SoLuongThem = 0;
    }
    if (this.SoLuongThem < 0) {
      alert('Số lượng thêm bắt buộc nhập số nguyên dương'); return;
    }

    if (!this.SoLuongBot) {
      this.SoLuongBot = 0;
    }
    if (this.SoLuongBot < 0) {
      alert('Số lượng bớt bắt buộc nhập số nguyên dương'); return;
    }
    if(this.SoLuongThem>0 && this.SoLuongBot > 0){
      alert('1 trong 2 số lượng thêm hoặc số lượng bớt phải bằng 0'); return;
    }
    let body = {
      Id: this.data.sanpham.Id,
      SoLuongThem: this.SoLuongThem,
      SoLuongBot: this.SoLuongBot
    }
    this.SaveBody(body);
  }
  readURL(event: any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if (typefile.toUpperCase() != 'JPG' && typefile.toUpperCase() != 'PNG') {
      alert('File không hỗ trợ'); return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.showImg = true;
      this.file = event.target.files[0];
      this.AnhDaiDien = '1';
    }
  }
  removeImg(event: any, index: number) {
    for (let i = 0; i < this.urls.length; i++) {
      if (i == index) {
        this.urls.splice(index, 1);
        this.showurls.splice(index, 1);
        this.file_chitiets.splice(index, 1);
      }
    }
  }
  async SaveBody(body) {
    if (this.SoLuongBot - this.SoLuongThem == 0) {
      alert('Số lượng không thay đổi'); return;
    }
    if (this.SoLuongBot - this.SoLuongThem > this.SoLuong) {
      alert('Số lượng không đủ để thay đổi'); return;
    }
    let data = await this.sanphamservice.saveSoluong(body);
    this.CallBack.emit(true);
      this.activeModal.close();
      alert('Thêm số lượng thành công');
  }
  bindDataEdit() {
    this.TenSanPham = this.data.sanpham.TenSanPham;
    this.SoLuong = this.data.sanpham.SoLuong;
  }
}
export class MauSac {
  Id : number
  TenMau : string
  MaMau : string
}
