

import { Component, OnInit,ViewChild  } from '@angular/core';
import {BaoCaoService} from './baocao.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from './../../core/utils/common-functions';

@Component({
  selector: 'app-baocao',
  templateUrl: './baocao.component.html',
})
export class BaoCaoComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  TuNgay:any = null;
  DenNgay:any= new Date();
  TuNgayDK:any = null;
  DenNgayDK:any = new Date();
  TuNgayCanDo:any = null;
  DenNgayCanDo:any = new Date();
  TuNgayTap:any = null;
  DenNgayTap:any = new Date();
  TuNgayConHanKhongTap:any = null;
  DenNgayConHanKhongTap:any = new Date();
  constructor(private readonly service: BaoCaoService,private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  async BaoCaoKhachHangDangTap(){
    let data = await this.service.BaoCaoKhachHangDangTap();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_DangTap");
    }
  }
  async BaoCaoKhachHangChuaCoGoiTap(){
    let data = await this.service.BaoCaoKhachHangChuaCoGoiTap();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_ChuaCoGoiTap");
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
    let data = await this.service.BaoCaoKhachHangHetHan(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_HetHan");
    }
  }
  async BaoCaoKhachHangMoiDangKyGoiTap(){
    if (this.TuNgayDK == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayDK == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayDK.getTime() > this.DenNgayDK.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayDK),
      DenNgay:convertDateObjToYMD(this.DenNgayDK),
    }
    let data = await this.service.BaoCaoKhachHangMoiDangKyGoiTap(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_MoiDangKyGoiTap");
    }
  }

  async BaoCaoDanhSachHoiVienThamGiaTapLuyen(){
    if (this.TuNgayTap== null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayTap == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayTap.getTime() > this.DenNgayTap.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayTap),
      DenNgay:convertDateObjToYMD(this.DenNgayTap),
    }
    let data = await this.service.BaoCaoDanhSachHoiVienThamGiaTapLuyen(body);

    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoDanhSachHoiVienThamGiaTapLuyen");
    }
  }

  async BaoCaoDanhSachHoiVienConHanKhongTap(){
    if (this.TuNgayConHanKhongTap== null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayConHanKhongTap == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayConHanKhongTap.getTime() > this.DenNgayConHanKhongTap.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayConHanKhongTap),
      DenNgay:convertDateObjToYMD(this.DenNgayConHanKhongTap),
    }
    let data = await this.service.BaoCaoDanhSachHoiVienConHanKhongTap(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoDanhSachHoiVienConHanKhongTap");
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

