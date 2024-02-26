import { Component, OnInit,ViewChild } from '@angular/core';
import {QuanLyMonAnService} from './service/quanlymonan.service';
import {ThemmoiMonAnComponent} from './child-component/themmoi.component';
import {XemMonPhuComponent} from './child-component/xemmonphu.component';
import {ImportMonAnComponent} from './child-component/import.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-quanlymonan',
  templateUrl: './quanlymonan.component.html',
  styleUrls: ['./quanlymonan.component.css']
})
export class QuanlymonanComponent implements OnInit {
  @ViewChild('dt') table: Table;
  monans:any=[];
  dataxoa:any={};
  selectedMonAns:any=[];
  constructor(private readonly monanservice: QuanLyMonAnService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAllMember();
  }
  async GetAllMember(){
    this.monans = await this.monanservice.GetAll();
  }
  async ThemMoi(nhanvien){
    var title ='Thêm mới món ăn';
    const modalRe = this.modalService.open(ThemmoiMonAnComponent,{size: 'lg',backdrop:'static'});
    if(nhanvien.Id!=0){
      title = 'Sửa thông tin món ăn';
    }
    var data = {title:title,monan:nhanvien};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      if(data){
        this.GetAllMember();
      }
      
    });
  }
  Import(){    
    const modalRe = this.modalService.open(ImportMonAnComponent,{size: 'lg',backdrop:'static'});    
    modalRe.componentInstance.data = {}; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      if(data){
        this.GetAllMember();
      }
      
    });
  }
  async delete(nhanvien) {
    let r = confirm('Bạn có muốn xóa món ăn này không?');
    if (r) {
      let data = await this.monanservice.Xoa(nhanvien);
      this.dataxoa = data;
      if (this.dataxoa.errorcode == 0) {
        alert('Xóa thành công');
        this.GetAllMember();
      } else {
        alert(this.dataxoa.message);
        return;
      }
    }
  }
  XemMonAnPhu(){
    const modalRe = this.modalService.open(XemMonPhuComponent,{size: 'lg',backdrop:'static'});   
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAllMember();
    });
  }
  deleteSelectedMonAns(){
    let count = this.selectedMonAns.length;
    if(count==0){
      alert('Bạn chưa chọn món ăn để xóa');
      return;
    }
    var r = confirm('Bạn có chắc muốn xóa '+count+' món ăn đã chọn không ?');
    if(r){
      let Ids = [];
      for(let i=0;i<count;i++){
        Ids.push(this.selectedMonAns[i].Id);
      }
      this.monanservice.XoaNhieuMon(Ids.toString());
      alert('Xóa danh sách các món ăn đã chọn thành công');
      this.selectedMonAns = [];
      this.GetAllMember();
    }
    
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.monans);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "monan");
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
