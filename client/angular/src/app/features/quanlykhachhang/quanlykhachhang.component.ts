import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThemMoiKhachHangComponent } from './child-component/them-moi-khach-hangcomponent';
import { DoiMatKhauKhachHangComponent } from './child-component/doi-mat-khau-khach-hangcomponent';
import { ImportKhachHangComponent } from './child-component/import.component';
import { QuanLyKhacHangcService } from './service/quanlykhachhang.service';
import { ThemTuDoComponent } from './child-component/them-tu-docomponent';
import { HuyKhachHangComponent } from './child-component/huy-khach-hang.component';
import { InXacNhanTrangChuComponent } from './child-component/inxacnhantrangchu.component';
import { Table } from 'primeng/table';
interface Lacbo {
  Id: number;
  CauLacBo: string;
}
interface Goitap {
  Id: number;
  TenCauHinh: string;
}
@Component({
  selector: 'app-quanlykhachhang',
  templateUrl: './quanlykhachhang.component.html',
  styleUrls: ['./quanlykhachhang.component.css'],
  providers: [DialogService]
})
export class QuanlykhachhangComponent implements OnInit {

  khachhangs: any = [];
  dataxoa: any = {};
  statuses: any[];
  statuses1: any[];
  TuNgay: Date;
  DenNgay: Date;
  selectedCauLacBo: Lacbo;
  caulacbos: Lacbo[];
  caulacbos1: any = [];
  selectedGoiTap: Goitap;
  goitaps: Goitap[];
  goitaps1: any = [];
  TinhTrangTap:number=-1;
  TinhTrang:number=-1;
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlykhachhangservice: QuanLyKhacHangcService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.statuses = [
      { label: 'Ngừng tập', value: '0' },
      { label: 'Đang tập', value: '1' },
      { label: 'Bảo lưu', value: '2' },
      { label: 'Đã chuyển', value: '3' }
    ]

    this.statuses1 = [
      { label: 'Còn hạn', value: '1' },
      { label: 'Hết hạn', value: '0' }
    ]
    this.quanlykhachhangservice.GetCauLacBo().then((data) => {
      this.caulacbos1 = data
      this.caulacbos = this.caulacbos1;
      this.selectedCauLacBo = this.caulacbos[0];
    })

    this.quanlykhachhangservice.GetGoiTap().then((data) => {
      this.goitaps1 = data
      this.goitaps = this.goitaps1;
      this.selectedGoiTap =  this.goitaps[0];
    })
    // var item = {
    //   CauLacBoId : -1,
    //   GoiTapId : -1,
    //   TinhTrang : -1,
    //   TinhTrangTap : -1,
    // }
    // this.quanlykhachhangservice.GetAll(item).then((data) => {
    //   console.log(data);
    //   this.khachhangs = data
    // });
   
    
    this.getalldata();
    
  }
  getalldata(){
    var item = {
      CauLacBoId : 0,
      GoiTapId : 0,
      TinhTrang : -1,
      TinhTrangTap : -1,
    }
    this.quanlykhachhangservice.GetAll(item).then((data) => {
      this.khachhangs = data
    });
  }
  btnThemMoi(tintuc) {

    const modalRef = this.modalService.open(ThemMoiKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
    }
    if (tintuc.Id != 0) {
      item = {
        Title: 'Sửa hội viên',
        Id: tintuc.Id,
        HoVaTen: tintuc.HoVaTen,
        SoDienThoai: tintuc.SoDienThoai,
        Email: tintuc.Email || '',
        SoThe: tintuc.SoThe,
        DiaChi: tintuc.DiaChi,
        AnhDaiDien: tintuc.AnhDaiDien,
        AnhBia: tintuc.AnhBia,
        TinhTrang: tintuc.TinhTrangView,
        NgaySinh: tintuc.NgaySinh,
        NgayBatDau: tintuc.NgayBatDau,
        NgayKetThuc: tintuc.NgayKetThuc,
        CauLacBoId: tintuc.CauLacBoId || 0,
        GoiTapId: tintuc.GoiTapId || 0,
        ZaloFb: tintuc.Zalofb,
        NgheNghiep: tintuc.NgheNghiep,
        GhiChu: tintuc.GhiChu,
        LienLacKhanCap: tintuc.LienLacKhanCap,
        TieuSuSucKhoe: tintuc.TieuSuSucKhoe,
        NguonKhachHangId: tintuc.NguonKhachHangId,
        NgayConLai: tintuc.NgayConLai,
        Voucher: tintuc.Voucher,
        PhiGiaNhap: tintuc.PhiGiaNhap,
        NgayDangKy: tintuc.NgayDangKy,
        TienDatCoc: tintuc.TienDatCoc,
        SoNgayTang: tintuc.SoNgayTang,
        ThuThach: tintuc.ThuThach,
        SucKhoeId: tintuc.SucKhoeId,
        HinhThucThanhToan: tintuc.HinhThucThanhToan,
        TinhTrangView: tintuc.TinhTrangView
      }
    } else {
      item = {
        Title: 'Thêm mới hội viên',
        Id: 0,
        HoVaTen: '',
        SoDienThoai: '',
        Email: '',
        SoThe: '',
        DiaChi: '',
        AnhDaiDien: '',
        AnhBia: '',
        TinhTrang: 0,
        NgaySinh: '',
        NgayBatDau: '',
        NgayKetThuc: '',
        CauLacBoId: 0,
        GoiTapId: 0,
        ZaloFb: '',
        NgheNghiep: '',
        GhiChu: '',
        LienLacKhanCap: '',
        TieuSuSucKhoe: '',
        NguonKhachHangId: 0,
        NgayConLai: 0,
        Voucher: '',
        PhiGiaNhap: 0,
        NgayDangKy: '',
        TienDatCoc: 0,
        SoNgayTang: 0,
        ThuThach: '',
        SucKhoeId: '',
        HinhThucThanhToan: 1,
        TinhTrangView: 1
      }
    }

    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      
      // this.quanlykhachhangservice.GetAll(itema).then((data) => { this.khachhangs = data })
      this.getalldata()
    );
  }
  btnImport(tintuc) {

    const modalRef = this.modalService.open(ImportKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });


    // modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      // this.quanlykhachhangservice.GetAll(itema).then((data) => { this.khachhangs = data })
      this.getalldata()
    );
  }

  changepass(tintuc) {

    const modalRef = this.modalService.open(DoiMatKhauKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
      Title: 'Thay đổi mật khẩu hội viên',
      Id: tintuc.Id
    }


    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      // this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})

    );
  }

  themtudo(tintuc) {

    const modalRef = this.modalService.open(ThemTuDoComponent, { size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-class' });
    let item = {
      Title: 'Thông tin hội viên',
      Id: tintuc.Id,
      HoiVien: tintuc
    }


    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      this.getalldata()
      // this.quanlykhachhangservice.GetAll(itema).then((data) => { this.khachhangs = data })

    );
  }

  async delete(khachhang) {
    const modalRef = this.modalService.open(HuyKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-class' });
    let item = khachhang;


    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      this.getalldata()
      // this.quanlykhachhangservice.GetAll(itema).then((data) => { this.khachhangs = data })

    );

    // var r = confirm("Bạn có chắc muốn xóa hội viên này không ?");
    // if (r == true) {
    //   let data =  await this.quanlykhachhangservice.Xoa(khachhang);
    //   this.dataxoa = data;
    //   console.log(data)
    //    if (this.dataxoa.errorcode == 0) {

    //       alert('Xóa thành công')
    //       this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data});
    //    } else {
    //       alert('Xóa lỗi')

    //     return;

    //   }
    // }

  }


  async InXacNhan(khachhang) {
    const modalRef = this.modalService.open(InXacNhanTrangChuComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = khachhang;


    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      this.getalldata()
      // this.quanlykhachhangservice.GetAll().then((data) => { this.khachhangs = data })

    );
  }


  async BaoCaoKhachHangHetHan() {
   
    let body = {
      CauLacBoId : this.selectedCauLacBo.Id,
      GoiTapId : this.selectedGoiTap.Id,
      TinhTrang : this.TinhTrang,
      TinhTrangTap : this.TinhTrangTap,
    }
    let data = await this.quanlykhachhangservice.GetAll(body);
    console.log(data);
    if(data['length']==0){
      alert('Không có dữ liệu');
    }else{
      this.exportExcel(data,"DanhSach_KhachHang_TimKiem");
    }
  }

  async TimKiem(){
    var item = {
      CauLacBoId : this.selectedCauLacBo.Id,
      GoiTapId : this.selectedGoiTap.Id,
      TinhTrang : this.TinhTrang,
      TinhTrangTap : this.TinhTrangTap,
    }
    this.quanlykhachhangservice.GetAll(item).then((data) => {
      console.log(data);
      this.khachhangs = data
    });
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
