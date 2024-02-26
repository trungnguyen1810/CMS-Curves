import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiCauHinhComponent} from './child-component/them-moi-cau-hinh.component';
import {CauHinhLienHeService} from './service/cauhinhlienhe.service';

@Component({
  selector: 'app-cauhinhlienhe',
  templateUrl: './cauhinhlienhe.component.html',
  styleUrls: ['./cauhinhlienhe.component.css'],
  providers: [DialogService]
})
export class CauhinhlienheComponent implements OnInit {
  cauhinhs:any=[];
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly cauhinhlienheservice : CauHinhLienHeService) { }
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.cauhinhlienheservice.GetCauHinh().then((data) => {
      this.cauhinhs= data;
    });
  }

  btnThemMoi(diaban) {
   
    const modalRef = this.modalService.open(ThemMoiCauHinhComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {};
        item = {
          Title:'Sửa cấu hình',
          SoDienThoai:diaban.SoDienThoai,
          SoDienThoaiZalo: diaban.SoDienThoaiZalo,  
          Idmessenger: diaban.Idmessenger,  
          IdTiktok: diaban.IdTiktok,
          IdZalo: diaban.IdZalo,
          IdFacebook: diaban.IdFacebook,
          IdYoutube: diaban.IdYoutube
        }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.cauhinhlienheservice.GetCauHinh().then((data) => {this.cauhinhs= data})
      
    );
  }

}
