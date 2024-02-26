import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyNhanVienService } from '../service/quanlynhanvien.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-themmoinhanvien',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemmoiNhanVienComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenDangNhap: string = '';
  HoVaTen: string = '';
  Email: string = '';
  SoDienThoai: string = '';
  MatKhau: string = '';
  NhapLaiMatKhau: string = '';
  isChecked: boolean = true;
  selectedNhomQuyen: any = {};
  nhomquyens: any = [];
  selectedCauLacBo :any = {};
  caulacbos :any = [];

  isAdd: boolean = false;

  constructor(public activeModal: NgbActiveModal, private nhanvienservice: QuanLyNhanVienService, private messageService: MessageService) { }
  ngOnInit(): void {
    if (this.data.nhanvien.Id != 0) {
      this.bindDataEdit(this.data.nhanvien);
    }
    if (this.data.nhanvien.Id == 0) {
      this.isAdd = true;
    }
    this.GetNhomQuyen();
    this.GetCauLacBo();
  }
  async saveData() {
    if (!this.TenDangNhap) {
      alert('Tên đăng nhập bắt buộc nhập'); return;
    }
    if (!this.HoVaTen) {
      alert('Họ và tên bắt buộc nhập'); return;
    }
    if (!this.SoDienThoai) {
      alert('Số điện thoại bắt buộc nhập'); return;
    }
    if (!this.Email) {
      alert('Email bắt buộc nhập'); return;
    }
    if (this.data.nhanvien.Id == 0) {
      if (!this.MatKhau) {
        alert('Mật khẩu bắt buộc nhập'); return;
      }
      if (!this.NhapLaiMatKhau) {
        alert('Nhập lại mật khẩu bắt buộc nhập'); return;
      }
      if (this.NhapLaiMatKhau != this.MatKhau) {
        alert('Mật khẩu không khớp,vui lòng kiểm tra lại'); return;
      }
    } else {
      if (this.MatKhau) {
        if (this.NhapLaiMatKhau != this.MatKhau) {
          alert('Mật khẩu không khớp,vui lòng kiểm tra lại'); return;
        }
      }
    }
    let body = {
      Id: this.data.nhanvien.Id,
      HoVaTen: this.HoVaTen,
      TenDangNhap: this.TenDangNhap,
      MatKhau: this.MatKhau,
      Email: this.Email,
      SoDienThoai: this.SoDienThoai,
      NhomQuyenId: this.selectedNhomQuyen.Id,
      CauLacBoId:this.selectedCauLacBo.Id,
      TinhTrang: this.isChecked ? 1 : 0
    }
    let data = await this.nhanvienservice.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.CallBack.emit(true);
      this.activeModal.close();
    }
    
  }

  CheckTinhTrang(event) {
    this.isChecked = event.target.checked;
  };

  async GetNhomQuyen() {
    let data = await this.nhanvienservice.GetNhomQuyen();
    this.nhomquyens = data;
    this.nhomquyens.unshift({Id:null,TenNhomQuyen:'--- Chọn ---'});
    this.selectedNhomQuyen = this.nhomquyens[0];
    if (this.data.nhanvien.Id > 0) {
      for (let i = 0; i < this.nhomquyens.length; i++) {
        if (this.nhomquyens[i].Id == this.data.nhanvien.NhomQuyenId) {
          this.selectedNhomQuyen = this.nhomquyens[i]; break;
        }
      }
    }
  }
  async GetCauLacBo(){
    let data = await this.nhanvienservice.GetCauLacBo();
    this.caulacbos = data;
    this.caulacbos.unshift({Id:null,TenCauLacBo:'---Chọn clb---'});
    this.selectedCauLacBo = this.caulacbos[0];
    if (this.data.nhanvien.Id > 0) {
      for (let i = 0; i < this.caulacbos.length; i++) {
        if (this.caulacbos[i].Id == this.data.nhanvien.CauLacBoId) {
          console.log(this.caulacbos[i])
          this.selectedCauLacBo = this.caulacbos[i]; break;
        }
      }
    } 
  }
  async bindDataEdit(nhanvien) {
    this.TenDangNhap = nhanvien.TenDangNhap;
    this.HoVaTen = nhanvien.HoVaTen;
    this.Email = nhanvien.Email;
    this.SoDienThoai = nhanvien.SoDienThoai;
    this.isChecked = nhanvien.TinhTrang == 1 ? true : false;
  }
}
