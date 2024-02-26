

import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyPhieuThuService} from './service/quanlyphieuthu.service';
import {ThemMoiPhieuThuComponent} from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from '../../core/utils/common-functions';


@Component({
  selector: 'app-quanlytudo',
  templateUrl: './quanlyphieuthu.component.html'
})
export class QuanlyPhieuThuComponent implements OnInit {
  phieuthus:any=[];
  TuNgay:any = new Date(new Date().setMonth(new Date().getMonth()-1));
  isCheck:any = false;
  DenNgay:any= new Date();
  caulacbos:any;
  selectedCauLacBo:any = [];
  selectedThanhToan:any = [];
  loaithanhtoans :any=[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyPhieuThuService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loaithanhtoans=[
      {Id:1,Ten:'Gói tập'},
      {Id:2,Ten:'Thuê tủ đồ'},
      {Id:4,Ten:'Sản Phẩm'}
    ]
    this.GetCauLacBo();
  }
  async GetCauLacBo(){
    this.caulacbos = await this.service.GetCauLacBo();
  }



  async TimKiem(){
    if (this.TuNgay == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgay == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgay.getTime() > this.DenNgay.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    if (this.selectedCauLacBo == null || this.selectedCauLacBo == "") {
      alert('Bạn chưa chọn câu lạc bộ'); return;
    }
    const CauLacBo = this.selectedCauLacBo.map(x => x.Id);
    if (this.selectedThanhToan == null || this.selectedThanhToan == "") {
      alert('Bạn chưa chọn loại thanh toán'); return;
    }
    const LoaiThanhToan = this.selectedThanhToan.map(x => x.Id);
    const body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay),
      CauLacBoId: CauLacBo,
      LoaiThanhToan:LoaiThanhToan
    }
    let data = await this.service.TimKiem(body);
    this.phieuthus = data;
  }
  async XuatBaoCao(){
    if (this.TuNgay == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgay == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgay.getTime() > this.DenNgay.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    if (this.selectedCauLacBo == null || this.selectedCauLacBo == "") {
      alert('Bạn chưa chọn câu lạc bộ'); return;
    }
    if (this.selectedThanhToan == null || this.selectedThanhToan == "") {
      alert('Bạn chưa chọn loại thanh toán'); return;
    }
    const LoaiThanhToan = this.selectedThanhToan.map(x => x.Id);
    const CauLacBo = this.selectedCauLacBo.map(x => x.Id);
    const body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay),
      CauLacBoId: CauLacBo,
      LoaiThanhToan:LoaiThanhToan

    }
    const data = await this.service.XuatBaoCao(body);
    if(data){
      window.location.href = data['filename']
    }
  }


}

