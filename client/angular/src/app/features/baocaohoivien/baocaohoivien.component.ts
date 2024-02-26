

import { Component, OnInit,ViewChild  } from '@angular/core';
import {BaoCaoHoiVienService} from '../baocaohoivien/service/baocaohoivien.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { convertDateObjToYMD } from '../../core/utils/common-functions';

@Component({
  selector: 'app-baocaohoivien',
  templateUrl: './baocaohoivien.component.html',
})
export class BaoCaoHoiVienComponent implements OnInit {
  datas:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  TuNgay:any = null;
  DenNgay:any= new Date();
  TuNgayDK:any = null;
  DenNgayDK:any = new Date();
  TuNgayCanDo:any = null;
  DenNgayCanDo:any = new Date();
  TuNgayNgungTap:any = null;
  DenNgayNgungTap:any = new Date();
  TuNgayChuyen:any = null;
  DenNgayChuyen:any = new Date();
  TuNgaySinh:any = null;
  DenNgaySinh:any = new Date();
  TuNgayHetHan:any = new Date();
  DenNgayHetHan:any = null;
  TuNgaySuDung:any = null;
  DenNgaySuDung:any = new Date();
  TuNgayThueTu:any = null;
  DenNgayThueTu:any = new Date();
  TuNgayBaoLuu:any = null;
  DenNgayBaoLuu:any = new Date();
  TuNgayHenTra:any = null;
  DenNgayHenTra:any = new Date();

  constructor(private readonly service: BaoCaoHoiVienService,private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  async BaoCao_DanhSachKhachHangDangBaoLuu(){
    let data = await this.service.BaoCao_DanhSachKhachHangDangBaoLuu();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangDangBaoLuu");
    }
  }

  async BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(){
    if (this.TuNgayBaoLuu == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayBaoLuu == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayBaoLuu.getTime() > this.DenNgayBaoLuu.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayBaoLuu),
      DenNgay:convertDateObjToYMD(this.DenNgayBaoLuu),
    }
    let data = await this.service.BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay");
    }
  }
  async BaoCao_DanhSachKhachHangHuy(){
    let data = await this.service.BaoCao_DanhSachKhachHangHuy();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangHuy");
    }
  }

  async BaoCao_DanhSachKhachHangHetHan(){
    let data = await this.service.BaoCao_DanhSachKhachHangHetHan();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangHetHan");
    }
  }
  async BaoCao_DanhSachKhachHangHuy_KhoangTIME(){
    if (this.TuNgayNgungTap == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayNgungTap == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayNgungTap.getTime() > this.DenNgayNgungTap.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayNgungTap),
      DenNgay:convertDateObjToYMD(this.DenNgayNgungTap),
    }
    let data = await this.service.BaoCao_DanhSachKhachHangHuy_KhoangTIME(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangHuy_KhoangThoiGian");
    }
  }

  async BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(){
    if (this.TuNgayChuyen == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayChuyen == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayChuyen.getTime() > this.DenNgayChuyen.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayChuyen),
      DenNgay:convertDateObjToYMD(this.DenNgayChuyen),
    }
    let data = await this.service.BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME");
    }
  }
  async BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(){
    if (this.TuNgaySinh == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgaySinh == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgaySinh.getTime() > this.DenNgaySinh.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgaySinh),
      DenNgay:convertDateObjToYMD(this.DenNgaySinh),
    }
    let data = await this.service.BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME");
    }
  }

  async BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(){
    if (this.TuNgayHetHan == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayHetHan == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayHetHan.getTime() > this.DenNgayHetHan.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayHetHan),
      DenNgay:convertDateObjToYMD(this.DenNgayHetHan),
    }
    let data = await this.service.BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCao_DanhSachHoiVienSapHetHan_KhoangTime");
    }
  }

  async DanhSachVoucher_DaSuDung_KhoangTime(){
    if (this.TuNgaySuDung == null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgaySuDung == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgaySuDung.getTime() > this.DenNgaySuDung.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgaySuDung),
      DenNgay:convertDateObjToYMD(this.DenNgaySuDung),
    }
    let data = await this.service.DanhSachVoucher_DaSuDung_KhoangTime(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSachVoucher_DaSuDung_KhoangTime");
    }
  }


  async DanhSachThueTuDo(){
    let data = await this.service.DanhSachThueTuDo();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSachThueTuDo");
    }
  }
  async BaoCaoDanhSachThueTuDo_TheoKhoangTime(){
    if (this.TuNgayThueTu== null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayThueTu == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayThueTu.getTime() > this.DenNgayThueTu.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayThueTu),
      DenNgay:convertDateObjToYMD(this.DenNgayThueTu),
    }
    let data = await this.service.BaoCaoDanhSachThueTuDo_TheoKhoangTime(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoDanhSachThueTuDo_TheoKhoangTime");
    }
  }
  async BaoCaoDanhSachHoiVien_HenTra(){
    if (this.TuNgayHenTra== null) {
      alert('Bạn chưa chọn từ ngày'); return;
    }
    if (this.DenNgayHenTra == null) {
      alert('Bạn chưa chọn đến ngày'); return;
    }
    if (this.TuNgayHenTra.getTime() > this.DenNgayHenTra.getTime()) {
      alert('Từ ngày không được lớn hơn đến ngày'); return;
    }
    let body = {
      TuNgay:convertDateObjToYMD(this.TuNgayHenTra),
      DenNgay:convertDateObjToYMD(this.DenNgayHenTra),
    }
    let data = await this.service.BaoCaoDanhSachHoiVien_HenTra(body);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoDanhSachHoiVien_HenTra");
    }
  }
  async BaoCaoKhachHangTreHenTraNo_GoiTap(){
    let data = await this.service.BaoCaoKhachHangTreHenTraNo_GoiTap();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoKhachHangTreHenTraNo_GoiTap");
    }
  }

  async BaoCaoKhachHangChuaVaCoGoiTap(){
    let data = await this.service.BaoCaoKhachHangChuaVaCoGoiTap();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoKhachHangChuaVaCoGoiTap");
    }
  }

  async BaoCaoKhachHangTiemNang(){
    let data = await this.service.BaoCaoKhachHangTiemNang();
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"BaoCaoKhachHangTiemNang");
    }
  }



  // async BaoCaoHoiVienCoLichCanDo(){
  //   window.location.href = "/baocaohoiviencolichcando";
  // }
  // async BaoCaoHoiVienTreHenCanDo(){
  //   window.location.href = "/baocaotrehencando";
  // }
  // async BaoCaoBienDongCanNang(){
  //   window.location.href = "/baocaobiendongcannang";
  // }
  // async BaoCaoBienDongCacChiSo(){
  //   if (this.TuNgayDK == null) {
  //     alert('Bạn chưa chọn từ ngày'); return;
  //   }
  //   if (this.DenNgayDK == null) {
  //     alert('Bạn chưa chọn đến ngày'); return;
  //   }
  //   if (this.TuNgayDK.getTime() > this.DenNgayDK.getTime()) {
  //     alert('Từ ngày không được lớn hơn đến ngày'); return;
  //   }
  //   let body = {
  //     TuNgay:convertDateObjToYMD(this.TuNgayDK),
  //     DenNgay:convertDateObjToYMD(this.DenNgayDK),
  //   }
  //   // let data = await this.service.BaoCaoKhachHangMoiDangKyGoiTap(body);
  //   // if(data['length']==0){
  //   //   alert('Không có dữ liệu');
  //   // }else{
  //   //   this.exportExcel(data,"DanhSach_KhachHang_MoiDangKyGoiTap");
  //   // }
  // }

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

