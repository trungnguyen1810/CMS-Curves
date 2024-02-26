import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {QuanLyNhomQuyenService} from '../service/quanlynhomquyen.service';

@Component({
  selector: 'app-themmoinhomquyen',
  templateUrl: './themmoinhomquyen.component.html',
  providers:[]
})

export class ThemmoinhomquyenComponent implements OnInit {
  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  menus:any=[];
  selectedMenu:any = [];
  MaNhomQuyen:string='';
  TenNhomQuyen:string='';
  MoTa:string='';
  isChecked:boolean=false;
   
  
  constructor( public activeModal: NgbActiveModal,private nhomquyenservice :QuanLyNhomQuyenService) { }
  ngOnInit(): void {
   
    this.GetAllMenu();
  }
  CheckTinhTrang(event) {
    this.isChecked= event.target.checked;   
  }
  async saveData(){
    if(!this.MaNhomQuyen){
      alert('Mã nhóm quyền bắt buộc nhập');return;
    }
    if(!this.TenNhomQuyen){
      alert('Tên nhóm quyền bắt buộc nhập');return;
    }
    let MenuIds = [];
    for(let i=0;i<this.selectedMenu.length;i++){
      MenuIds.push(this.selectedMenu[i].Id);
    }
    let obj = {
      Id:this.data.nhomquyen.Id,
      MaNhomQuyen:this.MaNhomQuyen,
      TenNhomQuyen:this.TenNhomQuyen,
      TinhTrang:this.isChecked?1:0,
      MoTa:this.MoTa,
      ListMenuId:MenuIds.toString()
    }
    let data = await this.nhomquyenservice.saveData(obj);
    alert(data['message']);
    if(data['errorcode']==0){      
      this.CallBack.emit(true);
      this.activeModal.close();
    }
  }
  async GetAllMenu(){
    let data = await this.nhomquyenservice.GetAllMenu();
    this.menus = data;
    if(this.data.nhomquyen.Id>0){
      this.SetMenuSelected();
      this.bindData();
    }
  }
  async SetMenuSelected(){
    let MenuIds_selected = this.data.nhomquyen.MenuIds;
    if(MenuIds_selected.length>0){
      let arr_menu = MenuIds_selected.split(',');
      for(let i=0;i<this.menus.length;i++){
        for(let j=0;j<arr_menu.length;j++){
          if(this.menus[i].Id==arr_menu[j]){
            this.selectedMenu.push(this.menus[i]);
          }          
        }
      }
    }
  }
  bindData(){
    this.MaNhomQuyen = this.data.nhomquyen.MaNhomQuyen;
    this.TenNhomQuyen = this.data.nhomquyen.TenNhomQuyen;
    this.MoTa = this.data.nhomquyen.MoTa;
    this.isChecked = this.data.nhomquyen.TinhTrang==1?true:false;
  }


}
