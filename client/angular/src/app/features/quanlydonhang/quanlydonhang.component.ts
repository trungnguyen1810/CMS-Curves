import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyDonHangService} from './service/quanlydonhang.service';
import {XemDonHangComponent} from './xemdonhang.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlydonhang',
  templateUrl: './quanlydonhang.component.html',
  styleUrls: ['./quanlydonhang.component.css']
})
export class QuanlydonhangComponent implements OnInit {
  donhangs:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly service: QuanLyDonHangService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
    this.statuses = [
      {label: 'Chưa xử lý', value: '1'},
      {label: 'Đã xử lý', value: '2'}   
  ]
  }
  async GetAll(){
    this.donhangs = await this.service.GetAll();
  }
  
  async delete(donhang){
    var r = confirm("Bạn có chắc muốn xóa đơn hàng này không ?");
    if (r == true) {
      let data = await this.service.Xoa(donhang.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
  async XuLy(donhang){
    var r = confirm("Bạn có chắc muốn xử lý đơn hàng này không ?");
    if (r == true) {
      let data = await this.service.XuLyDonHang(donhang.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAll();       
      }
    }
  }
  Xem(donhang){
  
    const modalRe = this.modalService.open(XemDonHangComponent,{size: 'lg',backdrop:'static'});
    
    var data = {donhang:donhang};
    modalRe.componentInstance.data = data; 
   
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.donhangs);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "donhang");
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
