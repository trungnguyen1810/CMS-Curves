

import { Component, OnInit,ViewChild  } from '@angular/core';
import {BaoCaoCanDoService} from '../baocaocando/service/baocaocando.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from './../../core/utils/common-functions';

@Component({
  selector: 'app-baocaocando',
  templateUrl: './baocaocando.component.html',
})
export class BaoCaoCanDoComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  tungaybc1:any = null;
  tungaybc2:any= new Date();
  TuNgayDK:any = null;
  DenNgayDK:any = new Date();
  TuNgayCanDo:any = null;
  DenNgayCanDo:any = new Date();
  constructor(private readonly service: BaoCaoCanDoService,private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  async BaoCaoHoiVienCoLichCanDo(){
    window.location.href = "/baocaohoiviencolichcando";
  }
  async BaoCaoHoiVienTreHenCanDo(){
    window.location.href = "/baocaotrehencando";
  }
  async BaoCaoBienDongCanNang(){
    window.location.href = "/baocaobiendongcannang";
  }
  async BaoCaoBienDongCacChiSo(){
    if (this.tungaybc1 == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.tungaybc2 == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.tungaybc1.getTime() > this.tungaybc2.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.tungaybc1),
      DenNgay:convertDateObjToYMD(this.tungaybc2),
    }
    let data = await this.service.BaoCaoBienDongCacChiSo(body);
    if(data){
      window.location.href = data['filename']
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

