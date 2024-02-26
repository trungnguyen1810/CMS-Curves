import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyLienHeService} from './service/quanlylienhe.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from './../../core/utils/common-functions';

@Component({
  selector: 'app-quanlylienhe',
  templateUrl: './quanlylienhe.component.html',
  styleUrls: ['./quanlylienhe.component.css']
})
export class QuanlylienheComponent implements OnInit {
  donhangs:any=[];
  statuses: any[];
  TuNgay:any = null;
  DenNgay:any= new Date();
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyLienHeService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
    this.statuses = [
      {label: 'Chưa xử lý', value: '0'},
      {label: 'Đã xử lý', value: '1'}   
  ]
  }

  async GetAll(){
    this.donhangs = await this.service.GetAll();
  }
  
  async delete(donhang){
    
    var r = confirm("Bạn có chắc muốn xóa liên hệ này không ?");
    if (r == true) {
      let data = await this.service.Xoa(donhang.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
  async XuLy(donhang){
    var r = confirm("Bạn có chắc muốn xử lý liên hệ này không ?");
    if (r == true) {
      let data = await this.service.XuLyDonHang(donhang.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }

  async BaoCaoKhachHangHetHan(){
    if (this.TuNgay == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgay == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgay.getTime() > this.DenNgay.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgay),
      DenNgay:convertDateObjToYMD(this.DenNgay),
    }
    let data = await this.service.BaoCao(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_HetHan");
    }
  }

  exportExcel(data,tenfile) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, tenfile);
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

}
