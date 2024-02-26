import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyLichSuService } from './service/lichsu.service';
import { ThemMoiLichSuComponent } from './child-component/themmoi.component';
import {QuetMaVachComponent} from './child-component/quetmavach.component';
import { convertDateObjToYMD } from '../../core/utils/common-functions';
import * as FileSaver from 'file-saver';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-quanlylichsuluyentap',
  templateUrl: './quanlylichsuluyentap.component.html',
  styleUrls: ['./quanlylichsuluyentap.component.css']
})
export class QuanlylichsuluyentapComponent implements OnInit {
  @ViewChild('dt') table: Table;
  lichsus: any = [];
  totalRecords: number;
  cols: any[];

  loading: boolean;
  TuNgay:any = new Date();
  DenNgay:any= new Date(new Date().setMonth(new Date().getMonth()+1));
  TenHoiVien:any='';
  SoThe:any='';
  SoDienThoai:any='';
  NgayTap:any='';
  ThangNam:any='';
  offset:any = 0;
  limit :any = 10;
  constructor(private readonly service: QuanLyLichSuService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.loadCustomers(event);
  }
  async ThemMoi(nhanvien) {
    var title = 'Thêm mới lịch sử luyện tập của hội viên';
    const modalRe = this.modalService.open(ThemMoiLichSuComponent, { size: 'lg', backdrop: 'static' });
    if (nhanvien.Id != 0) {
      title = 'Sửa lịch sử luyện tập của hội viên';
    }
    var data = { title: title, monan: nhanvien };
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe(data => {
      this.loadCustomers(event);
    });
  }

  async delete(d) {
    var r = confirm("Bạn có chắc muốn xóa bản ghi này không ?");
    if (r == true) {
      let data = await this.service.Xoa(d);
      if (data['errorcode'] == 0) {
        alert('Xóa thành công')
        this.loadCustomers(event);
      } else {
        alert(data['message']);
        return;
      }
    }

  }
  QuetMaVach() {
    const modalRe = this.modalService.open(QuetMaVachComponent, { size: 'lg', backdrop: 'static' });
    modalRe.componentInstance.data = {};
    modalRe.componentInstance.CallBack.subscribe(data => {
      this.loadCustomers(event);
    });
  }

  async loadCustomers(event) {
    this.loading = true;
    if (event.filters) {
      if (event.filters.TenHoiVien) {
        this.TenHoiVien = event.filters.TenHoiVien.value;

      } else {
        this.TenHoiVien = '';
      }
      if (event.filters.SoDienThoai) {
        this.SoDienThoai = event.filters.SoDienThoai.value;
      } else {
        this.SoDienThoai = '';
      }
      if (event.filters.SoThe) {
        this.SoThe = event.filters.SoThe.value;
      } else {
        this.SoThe = '';
      }
      if (event.filters.ThangNam) {
        this.ThangNam = event.filters.ThangNam.value;
      } else {
        this.ThangNam = '';
      }
      if (event.filters.NgayTap) {
        this.NgayTap = event.filters.NgayTap.value;
      } else {
        this.NgayTap = '';
      }
      this.offset = event.first;
      this.limit = event.rows;
    }
    const data_return  = await this.service.GetAll(this.offset,this.limit,this.TenHoiVien,this.SoDienThoai,this.SoThe,this.ThangNam,this.NgayTap);
    this.lichsus = data_return[0];
    this.totalRecords = data_return[1][0].totalRecords;
    this.loading = false;
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
    const body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay)
    }
    const data = await this.service.XuatBaoCao(body);
    if (data['errorcode'] == 0) {
      window.location.href = data['filename']
    } else {
        alert('Không có dữ liệu');return;
    }

  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.lichsus);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "lichsuluyentap");
    });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

}
