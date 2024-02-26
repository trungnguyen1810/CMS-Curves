import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import { MessageService } from 'primeng/api';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
import { AppSettings } from '../../../core/constants/Const';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-themmoisanphammua',
  templateUrl: './them-moi-san-pham.component.html',
  providers: [MessageService]
})

export class ThemMoiSanPhamComponent implements OnInit {

  @Input() data :any = {};
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  datasave: any = {};
  sanphams: any = [];
  danhsachsanphams: any = [];
  selectedSanPham: any = {};
  TongCong: number = 0;
  SoLuong: any = [];
  GiaSanPham: any = [];
  Title:string='';
  isvoucher: boolean = false;
  MaVoucher:string='';
  GiaTriVoucher:number = 0;
  showformvoucher:boolean=false;
  HinhThucThanhToan:number=1;
  GiaTriVoucherMoTa:string='';
  KhachHangId:Number = 1;
  NgayThanhToan:any = new Date();

  SoTienThanhToan:number=0;
  constructor(public activeModal: NgbActiveModal, private service: QuanLyKhacHangcService, private messageService: MessageService,private http:HttpClient) {

   }
  ngOnInit() {
    if(this.data.Id==0){
      this.Title = 'Thêm mới mua hàng';
    }else{
      this.Title = 'Cập nhật mua hàng';

    }
    this.KhachHangId = this.data.KhachHangId;
    this.GetDanhSachSanPhamCLB();

  }

  async saveData() {
    if (this.sanphams.length == 0) {
      alert('Bạn chưa chọn sản phẩm'); return;
    }
    if(this.data.IsCLB != '1'){
      alert('Tài khoản admin không được phép thực hiện chức năng này');return;
    }
    if (this.NgayThanhToan == null) {
      alert('Ngày thanh toán bắt buộc nhập'); return;
    }
    let body = {
      DonHangId: this.data.Id,
      KhachHangId: this.KhachHangId,
      ListSanPham: [],
      MaVoucher: this.MaVoucher,
      GiaTriVoucher: this.GiaTriVoucher,
      SoTienThanhToan: this.TongCong - this.GiaTriVoucher,
      HinhThucThanhToan: this.HinhThucThanhToan,
      TongTien: this.TongCong,
      SoTienConNo: 0,
      NgayThanhToan:convertDateObjToYMD(this.NgayThanhToan)
    }
    for (let i = 0; i < this.sanphams.length; i++) {
      let _itemsanpham = {
        SanPhamId: this.sanphams[i].Id,
        SoLuong: this.SoLuong[i].value,
        // GiaSanPham: this.sanphams[i].GiaSanPham
        GiaSanPham: this.GiaSanPham[i].value
      }
      for(let j = 0;j<this.danhsachsanphams.length;j++){

        if (Number(this.danhsachsanphams[j].SoLuong) < Number(_itemsanpham.SoLuong) && this.danhsachsanphams[j].Id == _itemsanpham.SanPhamId ){
          alert('Sản phẩm '+this.danhsachsanphams[j].TenSanPham + ' vượt quá số lượng trong kho,vui lòng kiểm tra lại');return;
        }
      }
      body.ListSanPham.push(_itemsanpham);
    }
    this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/CapNhatThemMoiDonHangSanPhamKhachHang`, body).subscribe(result => {
      if (result.errorcode == 0) {
        if(body.DonHangId==0){
          alert('Thêm mới đơn hàng hành công');
        }else{
          alert('Cập nhật đơn hàng hành công');
        }
        this.CallBack.emit(true);
        this.activeModal.close();
      } else {
        alert(result.message); return;
      }

    })


  }


  ThemSanPham() {
    if (this.selectedSanPham.Id > 0) {
      let check = true;
      for (let i = 0; i < this.sanphams.length; i++) {
        if (this.sanphams[i].Id == this.selectedSanPham.Id) {
          check = false;
        }
      }
      if (check) {
        this.selectedSanPham.GiaSanPham = this.selectedSanPham.GiaSanPham;
        this.selectedSanPham.ThanhTien = this.selectedSanPham.GiaSanPham;

        this.sanphams.push(this.selectedSanPham);
        this.SoLuong.push({ value: 1 });
        console.log(this.selectedSanPham)
        this.GiaSanPham.push({value:this.selectedSanPham.GiaSanPham})
        this.TinhTong();
      }

    } else {
      alert('Vui lòng chọn sản phẩm'); return;
    }
  }


  async GetDanhSachSanPhamCLB() {
    let data_sanpham= await this.service.GetDanhSachSanPhamCLB();
    this.danhsachsanphams = data_sanpham['data'].data;
    this.danhsachsanphams.unshift({ Id: -1, TenSanPham: 'Chọn sản phẩm',SoLuong:0 });
    this.selectedSanPham = this.danhsachsanphams[0];
    if(this.data.Id>0){
      this.BindEditForm(this.data.Id);
    }

  }
  onPressSoLuong(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  onPressGiaSanPham(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  ChangeSoLuong(index) {
    if (this.SoLuong[index].value > 9999) {

      this.SoLuong[index].value = 9999;
    }
    this.sanphams[index].ThanhTien = this.GiaSanPham[index].value * this.SoLuong[index].value;
    this.TinhTong();
  }
  ChangeGiaSanPham(index) {
    if (this.GiaSanPham[index].value <0) {

      this.GiaSanPham[index].value = 0;
    }
    this.sanphams[index].ThanhTien = this.GiaSanPham[index].value * this.SoLuong[index].value;
    this.TinhTong();
  }
  XoaSanPham(index) {
    this.sanphams.splice(index, 1);
    this.SoLuong.splice(index, 1);
    this.GiaSanPham.splice(index, 1);
    this.TinhTong();
  }
  TinhTong() {
    let total = 0;
    for (let i = 0; i < this.sanphams.length; i++) {
      total += this.GiaSanPham[i].value * this.SoLuong[i].value;
    }
    this.TongCong = total;
    this.SoTienThanhToan =  this.TongCong  - this.GiaTriVoucher;
    if(this.SoTienThanhToan<0){
      this.SoTienThanhToan=0;
    }
  }
  KiemTraMaVoucher() {
    if (!this.MaVoucher) {
      alert('Vui lòng nhập mã voucher !'); return;
    } else {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/KiemTraMaVoucherSanPham`, { MaVoucher: this.MaVoucher.trim(), KhachHangId: this.KhachHangId }).subscribe(result => {
        this.GiaTriVoucherMoTa = '';
        if (parseInt(result.data.data.errorcode) == 0) {
          if (result.data.data.LoaiMa == 2) {
            // là voucher sản phẩm
            this.GiaTriVoucher = 0;
            this.GiaTriVoucherMoTa = result.data.data.TenSanPham;
          } else {
            // là voucher giảm giá
            this.GiaTriVoucher = parseInt(result.data.data.SoTienTang);
            this.GiaTriVoucherMoTa =  result.data.data.SoTienTang;
          }
          this.SoTienThanhToan = this.TongCong - this.GiaTriVoucher;
          if (this.SoTienThanhToan < 0) {
            this.SoTienThanhToan = 0;
          }
        } else {
          this.GiaTriVoucher = 0;
          this.MaVoucher = '';
          this.GiaTriVoucherMoTa = result.data.data.message;
        }
      })
    }
  }
  async BindEditForm(DonHangId) {
    this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/ChiTietDonHang`, { DonHangId: DonHangId }).subscribe(result => {
     let data_donhang = result.data.donhang;
     let data_sanpham = result.data.listsanpham;
     this.HinhThucThanhToan = data_donhang.HinhThucThanhToan;
     this.MaVoucher = data_donhang.MaVoucher;
     this.GiaTriVoucher = data_donhang.GiaTriVoucher,
     this.GiaTriVoucherMoTa = data_donhang.GiaTriVoucher.toString();

     for(let i=0;i<data_sanpham.length;i++){
       for(let j=0;j<this.danhsachsanphams.length;j++){
         if(data_sanpham[i].SanPhamId==this.danhsachsanphams[j].Id){
           let obj_soluong = {value:data_sanpham[i].SoLuong}
            this.SoLuong.push(obj_soluong);
            this.GiaSanPham.push({value:data_sanpham[i].GiaSanPham});
            let obj_sanpham = this.danhsachsanphams[j];
            obj_sanpham.ThanhTien = parseInt(data_sanpham[i].SoLuong)*parseInt(data_sanpham[i].GiaSanPham);
            this.sanphams.push(obj_sanpham);
            this.TinhTong();
         }
       }
     }

    })

  }



}
