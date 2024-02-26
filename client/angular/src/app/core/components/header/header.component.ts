import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute ,NavigationEnd} from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
//import { User, Role } from '../models/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //currentUser: User;
  TongDonHang:number = 0;
  TongNoti:number = 0;
  TongDangKyGoiTapMoi : number = 0;
  TongDangKyNhuongQuyen:number = 0;
  TenDangNhap:string="admin";
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService
  ) {
    // hiển thị thông tin user trên header
     // this.authenticationService.currentUser.subscribe(x => console.log(x));
  }
  
  async ngOnInit(){
    if(this.authenticationService.currentUserValue!=null){
      let data = await this.authenticationService.getDataHeader();
        this.TenDangNhap = data['data']['TenDangNhap'];
        this.TongDonHang = data['data']['TongDonHang'];
        this.TongDangKyGoiTapMoi = data['data']['TongDangKyGoiTapMoi'];
        this.TongDangKyNhuongQuyen = data['data']['TongDangKyNhuongQuyen'];
        this.TongNoti = Number(this.TongDonHang) + Number(this.TongDangKyGoiTapMoi) + Number(this.TongDangKyNhuongQuyen);
      setInterval(async () => {
        let data = await this.authenticationService.getDataHeader();
        this.TenDangNhap = data['data']['TenDangNhap'];
        this.TongDonHang = data['data']['TongDonHang'];
        this.TongDangKyGoiTapMoi = data['data']['TongDangKyGoiTapMoi'];
        this.TongDangKyNhuongQuyen = data['data']['TongDangKyNhuongQuyen'];
        this.TongNoti = Number(this.TongDonHang) + Number(this.TongDangKyGoiTapMoi) + Number(this.TongDangKyNhuongQuyen);
      }, 10000);
      
    }
  }
  

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
  RedirectURL(url){
    this.router.navigate([url]);
  }
  void(){}
}
