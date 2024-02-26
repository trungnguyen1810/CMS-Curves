import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyThongBaoService } from '../service/quanlythongbao.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-themmoithongbao',
  templateUrl: './themmoi.component.html',
  providers: [MessageService]
})

export class ThemMoiThongBaoComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TieuDe: string = '';
  NoiDung: string = ''; 
  TomTat:string='';
  selectedThongBao: any = {};
  loaithongbaos: any = [];
  BaiViets: any = [];
  selectedBaiViet: any = {};
  baiviet: any = [];

  constructor(public activeModal: NgbActiveModal, private service: QuanLyThongBaoService, private messageService: MessageService) { }
  ngOnInit(): void { 
    
    let item1 = {
      Id : 1
    }
    this.GetBaiViet(item1, 0);
    this.loaithongbaos = [
      {Id:1,TenLoaiThongBao:'Tin tức'},
      {Id:2,TenLoaiThongBao:'Khuyến mãi'},
      // 3 loại sau tạm thời ko dùng
      //{Id:3,TenLoaiThongBao:'Hết hạn đăng ký gói'},
      // {Id:4,TenLoaiThongBao:'Ngày lễ'},
      //{Id:5,TenLoaiThongBao:'Chúc mừng sinh nhật'},
      //{Id:6,TenLoaiThongBao:'Theo danh sách'},
      {Id:8,TenLoaiThongBao:'Thực đơn tham khảo'},
      {Id:9,TenLoaiThongBao:'Danh mục sản phẩm'},
      {Id:10,TenLoaiThongBao:'Curves Complete'},
      {Id:11,TenLoaiThongBao:'Ưu dãi dành cho hội viên '},
      {Id:12,TenLoaiThongBao:'Đăng ký nhượng quyền'},
    ]
    if (this.data.thongbao.Id != 0) {
      this.bindDataEdit(this.data.thongbao);
    }else{
      this.selectedThongBao = this.loaithongbaos[0];
    }   

  }

   onChangeLoaiThongBao(event) {
    // console.log('event :' + event);
    // console.log(event.Id);
    // let item = {
    //   Id : 0
    // }
    this.GetBaiViet(event, 0);
  }

  async GetBaiViet(event, Id) {
    let data = await this.service.LoadBaiViet(event);
      //this.datasave = data;
      // console.log(data);
      this.baiviet = data;
      if (this.baiviet.data.length>0){
        this.selectedBaiViet = this.baiviet.data[0]
      } 
      this.BaiViets = this.baiviet.data;

      if(Id != 0) {
        this.selectedBaiViet = this.BaiViets.find(country => country.Id == Id);
        if(!this.selectedBaiViet){
          this.selectedBaiViet = this.baiviet.data[0];
        }
      }else {
        this.selectedBaiViet = this.baiviet.data[0];
      }
  }

  async saveData() {
    if (!this.TieuDe) {
      alert('Tiêu đề bắt buộc nhập'); return;
    }
    if (!this.NoiDung) {
      alert('Nội dung thông báo bắt buộc nhập'); return;
    }    
    
    let body = {
      Id: this.data.thongbao.Id,
      TieuDe: this.TieuDe,
      NoiDung: this.NoiDung,  
      TomTat:this.TomTat, 
      Type: this.selectedThongBao.Id,
      IdThongBao: this.selectedBaiViet.Id
    }
    let data = await this.service.saveData(body);
    alert(data['message']);
    if (data['errorcode'] == 0) {
      this.CallBack.emit(true);
      this.activeModal.close();
    }
    
  }

  

  
  async bindDataEdit(thongbao) {
    let item1 = {
      Id : thongbao.Type
    }
    this.GetBaiViet(item1, thongbao.IdThongBao);
    this.TieuDe = thongbao.TieuDe;
    this.NoiDung = thongbao.NoiDung;
    this.TomTat = thongbao.TomTat;
    for (let i = 0; i < this.loaithongbaos.length; i++) {
  
      if (this.loaithongbaos[i].Id == thongbao.Type) {
        this.selectedThongBao = this.loaithongbaos[i]; break;
      }
    }
  }
}
