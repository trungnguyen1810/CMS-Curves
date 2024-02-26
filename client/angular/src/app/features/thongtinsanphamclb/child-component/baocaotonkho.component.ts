import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLySanPhamService } from '../service/quanlysanpham.service';
import { MessageService } from 'primeng/api';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { convertDateObjToYMD } from '../../../core/utils/common-functions';


@Component({
  selector: 'app-baocaotonkho',
  templateUrl: './baocaotonkho.component.html',
  providers: [MessageService]
})

export class BaoCaoTonKhoComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  selectedCauLacBo: any= null;
  caulacbos: any= [];
  DenNgay:any = null;
  TuNgay:any = null;
  constructor(public activeModal: NgbActiveModal, private sanphamservice: QuanLySanPhamService, private messageService: MessageService,private primengConfig: PrimeNGConfig) {

  }
  async ngOnInit() {
    this.primengConfig.ripple = true;
    this.sanphamservice.GetCauLacBo().then((data) => {
      this.caulacbos =data;
     // this.selectedCauLacBo = this.caulacbos[0];
    })
    this.DenNgay = new Date();
    let a = new Date();
    a.setMonth(a.getMonth()-3);
    this.TuNgay = new Date(a);
  }

  async XuatBaoCao() {
    if (this.TuNgay == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgay == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgay.getTime() > this.DenNgay.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    if (this.selectedCauLacBo == null || this.selectedCauLacBo == ""||this.selectedCauLacBo==[]) {
      alert('Bạn chưa chọn câu lạc bộ'); return;
    }
    let CauLacBo = this.selectedCauLacBo.map(x => x.Id);
    const body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay),
      CauLacBoId: CauLacBo.toString()
    }
    console.log(body);
    const data = await this.sanphamservice.XuatBaoCaoTonKho(body);
    if(data){
      window.location.href = data['filename']
    }
  }


  async SaveBody(body) {
    // if (this.SoLuongBot - this.SoLuongThem == 0) {
    //   alert('Số lượng không thay đổi'); return;
    // }
    // if (this.SoLuongBot - this.SoLuongThem > this.SoLuong) {
    //   alert('Số lượng không đủ để thay đổi'); return;
    // }
    // let data = await this.sanphamservice.saveSoluong(body);
    // this.CallBack.emit(true);
    //   this.activeModal.close();
    //   alert('Thêm số lượng thành công');
  }

}
