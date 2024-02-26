import { Component, OnInit,ViewChild  } from '@angular/core';
import {BaoCaoHoiVienService} from '../service/baocaohoivien.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-baocaohoiviencolichcando',
  templateUrl: './baocaotrehencando.component.html',
  styleUrls: ['./baocaotrehencando.component.css']
})
export class BaocaohoivientrehencandoComponent implements OnInit {
  donhangs:any=[];
  TuNgay:any = new Date();
  DenNgay:any= new Date(new Date().setMonth(new Date().getMonth()+1));
  caulacbos:any;
  selectedCauLacBo:any = [];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: BaoCaoHoiVienService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetCauLacBo();
  }
  async GetCauLacBo(){
    this.caulacbos = await this.service.GetCauLacBo();
  }
  async TimKiem(){
    // if (this.TuNgay == null) {
    //   alert('Bạn chưa chọn từ ngày'); return;
    // }
    // if (this.DenNgay == null) {
    //   alert('Bạn chưa chọn đến ngày'); return;
    // }
    // if (this.TuNgay.getTime() > this.DenNgay.getTime()) {
    //   alert('Từ ngày không được lớn hơn đến ngày'); return;
    // }
    if (this.selectedCauLacBo == null || this.selectedCauLacBo == "") {
      alert('Bạn chưa chọn câu lạc bộ'); return;
    }
    const CauLacBo = this.selectedCauLacBo.map(x => x.Id);
    const body = {
      // TuNgay:convertDateObjToYMD(this.TuNgay),
      // DenNgay:convertDateObjToYMD(this.DenNgay),
      CauLacBoId: CauLacBo
    }
    this.donhangs = await this.service.DanhSachHoiVienTreHen(body);
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
    const CauLacBo = this.selectedCauLacBo.map(x => x.Id);
    const body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay),
      CauLacBoId: CauLacBo
    }
    const data = await this.service.BaoCaoHoiVienTreHen(body);
    if(data){
      window.location.href = data['filename']
    }
  }

}
