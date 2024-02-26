import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { QuanLyPhieuThuService } from './service/quanlyphieuthu.service';

@Component({
  selector: 'app-xemdonhang',
  templateUrl: './xemdonhang.component.html',
  providers: [MessageService]
})

export class XemDonHangComponent implements OnInit {

  @Input() data;
  TinhTrangDonHang:string = "Chưa xử lý";
  TongSoTien:number = 0;
  ThongTinSanPham:string ='';
  SoTienThanhToan:any = 0;
  selectedHinhThucThanhToan:any = 1;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();



  constructor(public activeModal: NgbActiveModal, private service: QuanLyPhieuThuService,) { }
  ngOnInit(): void {
   console.log(this.data);
   this.TongSoTien = this.data.TongTienDungCu + this.data.TongTienTuDo;

}

async saveData() {
  let body = {
    SoTienThanhToan: this.SoTienThanhToan,
    HinhThucThanhToan: Number(this.selectedHinhThucThanhToan),
    TongSoTien: this.TongSoTien,
    TongTienDungCu: this.data.TongTienDungCu,
    TongTienTuDo: this.data.TongTienTuDo,
    TenKhachHang: this.data.TenKhachHang,
    DiaChi:this.data.DiaChi,
    Email: this.data.Email,
    SoDienThoai: this.data.SoDienThoai,
    TuNgay: this.data.TuNgay,
    DenNgay: this.data.DenNgay,
    sanphams: this.data.sanphams
   }

   console.log(body)
  let data = await this.service.saveDataGoiTap(body);
  alert(data['message']);
  if (data['errorcode'] == 0) {
    this.CallBack.emit(true);
    this.activeModal.close();
  }

}

}
