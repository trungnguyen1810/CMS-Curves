import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiTinTucComponent} from './child-component/them-moi-tin-tuc.component';
import {TinTucs} from './model/tintuc';
import {QuanLyTinTucService} from './service/quanlytintuc.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-quanlytintuc',
  templateUrl: './quanlytintuc.component.html',
  styleUrls: ['./quanlytintuc.component.css'],
  providers: [DialogService]
})
export class QuanlytintucComponent implements OnInit {
  tintucs:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlytintucservice : QuanLyTinTucService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void { 
    this.quanlytintucservice.GetAlltintuc().then((data) => {console.log(data); this.tintucs= data}); 
  }

//   ThemMoiTinTuc() {
//     this.ref = this.dialogService.open(ThemMoiTinTucComponent, {
//      header: 'Thêm mới nhóm quyền',
//      width: '70%',
//      contentStyle: {"max-height": "500px", "overflow": "auto"},
//      baseZIndex: 10000
//    });
//  }

 btnThemMoi(tintuc) {
   
  const modalRef = this.modalService.open(ThemMoiTinTucComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  let item = {
    // TieuDe:'Thêm mới tin tức, khuyến mại',
    // Id:0,
    // // selectedChuyenMuc:{Id:-1,TenChuyenMuc:'Chọn chuyên mục'},
    // // selectedTinhTrang:{Id: 1, TenTinhTrang: 'Đã duyệt'},  
    // // selectedDonVi :{Id:-1,TenDonVi: '--Lựa chọn--'}, 
    // AnhDaiDien:'',
    // NoiDung:'',TomTat:'',NguonTin:'',TacGia:'',NoiBat:false,TuKhoa:''     
  }
  if(tintuc.Id!=0){
      item = {
        Title:'Sửa tin tức - khuyến mại',
        Id:tintuc.Id,
        TieuDe: tintuc.TieuDe,  
        TomTat: tintuc.TomTat,  
        NoiDung: tintuc.NoiDung,  
        tintuc: tintuc.LoaiTinTucId,  
        AnhDaiDien: tintuc.AnhDaiDien,  
        LinkChiaSe: tintuc.LinkChiaSe,  
        TinhTrang: tintuc.TinhTrang,
        HienThiTrangChu: tintuc.HienThiTrangChu,
        ThuTuSapXep: tintuc.ThuTuSapXep
      }
    } else {
      item = {
        Title:'Thêm mới tin tức - khuyến mại',
        Id:0,
        TieuDe: '',  
        TomTat: '',  
        NoiDung: '',  
        tintuc: 0,  
        AnhDaiDien: '',  
        LinkChiaSe: '',  
        TinhTrang: 0,
        HienThiTrangChu: 0,
        ThuTuSapXep: 1,
      }
    }
  
  modalRef.componentInstance.OBJ = item;
  modalRef.componentInstance.CallBack.subscribe(data =>
    this.quanlytintucservice.GetAlltintuc().then((data) => {this.tintucs= data})
    
  );
}

async deleteTinTuc(tintuc){
  var r = confirm("Bạn có chắc muốn xóa tin tức này không ?");
    if (r == true) {
      let data =  await this.quanlytintucservice.XoaTinTuc(tintuc);
      this.dataxoa = data;
      console.log(data)
       if (this.dataxoa.errorcode == 0) {
         
          alert('Xóa thành công')
          this.quanlytintucservice.GetAlltintuc().then((data) => {this.tintucs= data});
       } else {
          alert('Xóa lỗi')
        
        return;
    
      }
    }
 
}

  

}
