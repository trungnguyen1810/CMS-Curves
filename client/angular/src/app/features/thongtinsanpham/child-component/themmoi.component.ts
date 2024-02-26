import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLySanPhamService } from '../service/quanlysanpham.service';
import { MessageService } from 'primeng/api';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { isFulfilled } from 'q';

@Component({
  selector: 'app-themmoisanpham',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemmoiSanPhamComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenDanhMuc: string = '';
  isChecked: boolean = true;
  isChecked_ConHang :boolean=true;
  imageSrc: string = '';
  AnhDaiDien: string = '';
  AnhChiTiet: string = '';
  showImg: boolean = false;
  file: any = null;
  dataupload: any = {};
  selectedNhomSanPham: any = {};
  nhomsanphams: any = [];

  TenSanPham: string = '';

  Gia: string = '0';
  MoTa: string = '';
  urls = [];
  showurls: any = [];
  file_chitiets: any = [];

  sizes: any = [];
  selectedColors:any = [];

  selectedSizes:any = [];
  colors: MauSac[];
  chatlieus:any=[];
  selectedChatlieus:any = [];
  checkIsclb :any = [];
  Isclb: boolean = false;
  constructor(public activeModal: NgbActiveModal, private sanphamservice: QuanLySanPhamService, private messageService: MessageService,private primengConfig: PrimeNGConfig) {

  }

  async ngOnInit() {
    this.primengConfig.ripple = true;
    await this.CheckIsclb();
    if(this.checkIsclb[0][0].Isclb == "1"){
      this.Isclb = true;
    }
    console.log(this.Isclb);
    await this.GetThongTinSanPham(this.data.sanpham.Id);
    if (this.data.sanpham.Id != 0) {
      await this.bindDataEdit();
    }

  }
  async CheckIsclb(){
    this.checkIsclb = await this.sanphamservice.nhanvien_check_admin();
  }
  async saveData() {
    if (!this.selectedNhomSanPham) {
      alert('Bắt buộc chọn nhóm sản phẩm'); return;
    }
    if (!this.TenSanPham) {
      alert('Tên sản phẩm bắt buộc nhập'); return;
    }
    if (!this.MoTa) {
      alert('Mô tả bắt buộc nhập'); return;
    }
    if (!this.AnhDaiDien) {
      alert('Ảnh đại diện bắt buộc chọn'); return;
    }
    if (!this.Gia) {
      this.Gia = '0';
    }
    if (parseInt (this.Gia) < 0) {
      alert('Giá sản phẩm bắt buộc nhập số nguyên dương'); return;
    }
    if (this.urls.length == 0) {
      alert('Ảnh chi tiết sản phẩm bắt buộc chọn'); return;
    }
    let body = {
      Id: this.data.sanpham.Id,
      TenSanPham: this.TenSanPham,
      DanhMucSanPhamId: this.selectedNhomSanPham.Id,
      Gia: this.convertMoney(this.Gia),
      AnhDaiDien: '1',
      Color:'',
      Size:'',
      ChatLieu:'',
      MoTa: this.MoTa,
      HienThi: this.isChecked == true ? 1 : 0,
      ConHang:this.isChecked_ConHang== true ? 1 : 0,
      AnhChiTiet: 'xxxxx',
    }
    let arr_color= [];
    for(let i=0;i<this.selectedColors.length;i++){
      arr_color.push(this.selectedColors[i].Id);
    }
    let arr_size= [];
    for(let i=0;i<this.selectedSizes.length;i++){
      arr_size.push(this.selectedSizes[i].Id);
    }
    let arr_chatlieu= [];
    for(let i=0;i<this.selectedChatlieus.length;i++){
      arr_chatlieu.push(this.selectedChatlieus[i].Id);
    }
    body.Color = arr_color.toString();
    body.Size = arr_size.toString();
    body.ChatLieu = arr_chatlieu.toString();
    if (this.file != null) {
      let url_anhdaidien = await this.PostImage(this.file);
      body.AnhDaiDien = url_anhdaidien;
      this.SaveBody(body);
    } else {
      body.AnhDaiDien = this.AnhDaiDien;
      this.SaveBody(body);
    }


  }
  CheckTinhTrang(event) {
    this.isChecked = event.target.checked;
  };
  CheckTinhTrangConHang(event) {
    this.isChecked_ConHang = event.target.checked;
  };
  readURL(event: any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if (typefile.toUpperCase() != 'JPG' && typefile.toUpperCase() != 'PNG') {
      alert('File không hỗ trợ'); return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.showImg = true;
      this.file = event.target.files[0];
      this.AnhDaiDien = '1';
    }
  }
  removeImg(event: any, index: number) {
    for (let i = 0; i < this.urls.length; i++) {
      if (i == index) {
        this.urls.splice(index, 1);
        this.showurls.splice(index, 1);
        this.file_chitiets.splice(index, 1);
      }
    }
  }
  async SaveBody(body) {
    let data = await this.sanphamservice.saveData(body);
    if (data['errorcode'] == 0) {
      for (let i = 0; i < this.file_chitiets.length; i++) {
        let url_detail = await this.PostImage(this.file_chitiets[i]);
        this.sanphamservice.EditAnhChiTiet(this.data.sanpham.Id, url_detail, i);
      }
      for(let i=0;i<this.urls.length;i++){
        if(this.urls[i].length<100){
          this.sanphamservice.EditAnhChiTiet(this.data.sanpham.Id, this.urls[i], i);
        }
      }

      this.CallBack.emit(true);
      this.activeModal.close();
      alert(data['message']);
    } else {
      alert(data['message']); return;
    }
  }
  async PostImage(file) {
    var data = new FormData(); data.append('file', file);
    this.dataupload = await this.sanphamservice.upload(data);
    if (this.dataupload.errorcode == 0) {
      return '/upload/' + this.dataupload.data.filename;
    } else {
      alert('Upload ảnh lỗi'); return;
    }
  }


  bindDataEdit() {
    this.TenSanPham = this.data.sanpham.TenSanPham;
    this.AnhDaiDien = this.data.sanpham.AnhDaiDien;
    this.imageSrc = this.AnhDaiDien;
    this.showImg = true;
    this.Gia = this.data.sanpham.Gia.toString().replace(',','');
    this.Gia = this.convertMoney(this.Gia);
    this.Gia = this.Gia.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    this.isChecked = this.data.sanpham.TinhTrang == 1 ? true : false;
    this.isChecked_ConHang = this.data.sanpham.TinhTrangConHang== 1 ? true : false;
    this.MoTa = this.data.sanpham.MoTa;
    this.urls = this.data.sanpham.AnhChiTiet.split(',');
    for (let i = 0; i < this.urls.length; i++) {
      this.showurls.push(true);
    }
    for (let i = 0; i < this.nhomsanphams.length; i++) {
      if (this.nhomsanphams[i].Id == this.data.sanpham.DanhMucSanPhamId) {
        this.selectedNhomSanPham = this.nhomsanphams[i]; break;
      }
    }

     if(this.data.sanpham.ColorId!=null){
      let arr_color = this.data.sanpham.ColorId.split(',');
      for(let i=0;i<arr_color.length;i++){
        for(let j=0;j<this.colors.length;j++){
          if(this.colors[j].Id==arr_color[i]){
            this.selectedColors.push(this.colors[j]);
          }
        }
      }
     }
     if(this.data.sanpham.SizeId!=null){
      let arr_size = this.data.sanpham.SizeId.split(',');
      for(let i=0;i<arr_size.length;i++){
        for(let j=0;j<this.sizes.length;j++){
          if(this.sizes[j].Id==arr_size[i]){
            this.selectedSizes.push(this.sizes[j]);
          }
        }
      }
     }
     if(this.data.sanpham.MaterialId!=null){
      let arr_chatlieu = this.data.sanpham.MaterialId.split(',');
      for(let i=0;i<arr_chatlieu.length;i++){
        for(let j=0;j<this.chatlieus.length;j++){
          if(this.chatlieus[j].Id==arr_chatlieu[i]){
            this.selectedChatlieus.push(this.chatlieus[j]);
          }
        }
      }
     }

  }
  async GetThongTinSanPham(Id) {
    let data = await this.sanphamservice.GetThongTinSanPham(Id);
    this.nhomsanphams = data[0];
    if (Id == 0) {
      this.selectedNhomSanPham = this.nhomsanphams[0];
    }
    this.colors = data[2];
    this.sizes = data[3];
    this.chatlieus = data[4];
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      let total_file = filesAmount + this.urls.length;
      if (total_file > 8) {
        alert('Chỉ được chọn tối đa 8 ảnh chi tiết'); return;
      } else {
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.urls.push(event.target.result);
            this.showurls.push(true);
          }
          reader.readAsDataURL(event.target.files[i]);
          this.file_chitiets.push(event.target.files[i]);
        }
      }
    }
  }
  convertMoney(m) {
    m = m.split(".").join("");
    return m;
  }
  convertNumberToMoney(n) {
    n = n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return n;
  }
  formatMoney(event) {
    this.Gia = this.convertMoney(this.Gia);
    this.Gia = this.Gia.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  }
  onPressTien(evt) {
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
}
export class MauSac {
  Id : number
  TenMau : string
  MaMau : string
}
