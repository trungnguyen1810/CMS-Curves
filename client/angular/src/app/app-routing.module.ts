import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { Page404Component } from './core/components/page404/page404.component';

const routes: Routes = [
  { path:'',
  component: HomeComponent,
  canActivate: [AuthGuard],

 },
  { path:'login', component: LoginComponent},
  { path:'404', component: Page404Component },
  { path: 'quanlythongbao', loadChildren: () => import('./features/quanlythongbao/quanlythongbao.module').then(m => m.QuanlythongbaoModule) },
  { path: 'quanlyhethong', loadChildren: () => import('./features/quanlyhethong/quanlyhethong.module').then(m => m.QuanlyhethongModule) },
  { path: 'quanlynhanvien', loadChildren: () => import('./features/quanlynhanvien/quanlynhanvien.module').then(m => m.QuanlynhanvienModule) },
  { path: 'quanlykhachhang', loadChildren: () => import('./features/quanlykhachhang/quanlykhachhang.module').then(m => m.QuanlykhachhangModule) },
  { path: 'danhmucsanpham', loadChildren: () => import('./features/danhmucsanpham/danhmucsanpham.module').then(m => m.DanhmucsanphamModule) },
  { path: 'thongtinsanpham', loadChildren: () => import('./features/thongtinsanpham/thongtinsanpham.module').then(m => m.ThongtinsanphamModule) },
  { path: 'quanlybanner', loadChildren: () => import('./features/quanlybanner/quanlybanner.module').then(m => m.QuanlybannerModule) },
  { path: 'quanlytintuc', loadChildren: () => import('./features/quanlytintuc/quanlytintuc.module').then(m => m.QuanlytintucModule) },
  { path: 'quanlycaulacbo', loadChildren: () => import('./features/quanlycaulacbo/quanlycaulacbo.module').then(m => m.QuanlycaulacboModule) },
  { path: 'cauhinhhethong', loadChildren: () => import('./features/quanlynhuongquyen/quanlynhuongquyen.module').then(m => m.QuanlynhuongquyenModule) },
  { path: 'camnangdinhduong', loadChildren: () => import('./features/camnangdinhduong/camnangdinhduong.module').then(m => m.CamnangdinhduongModule) },
  { path: 'thucdonthamkhao', loadChildren: () => import('./features/thucdonthamkhao/thucdonthamkhao.module').then(m => m.ThucDonThamKhaoModule) },
  { path: 'quanlylienhe', loadChildren: () => import('./features/quanlylienhe/quanlylienhe.module').then(m => m.QuanlylienheModule) },
  { path: 'quanlynhomquyen', loadChildren: () => import('./features/quanlynhomquyen/quanlynhomquyen.module').then(m => m.QuanlynhomquyenModule) },
  { path: 'quanlytinhthanh', loadChildren: () => import('./features/danhmuctinhthanh/danhmuctinhthanh.module').then(m => m.DanhmuctinhthanhModule) },
  { path: 'quanlylichsucando', loadChildren: () => import('./features/quanlylichsucando/quanlylichsucando.module').then(m => m.QuanlylichsucandoModule) },
  { path: 'quanlymonan', loadChildren: () => import('./features/quanlymonan/quanlymonan.module').then(m => m.QuanlymonanModule) },
  { path: 'quanlydonhang', loadChildren: () => import('./features/quanlydonhang/quanlydonhang.module').then(m => m.QuanlydonhangModule) },
  { path: 'cauhinhlienhe', loadChildren: () => import('./features/cauhinhlienhe/cauhinhlienhe.module').then(m => m.CauhinhlienheModule) },
  { path: 'quanlysize', loadChildren: () => import('./features/quanlysize/quanlysize.module').then(m => m.QuanlysizeModule) },
  { path: 'quanlycolor', loadChildren: () => import('./features/quanlycolor/quanlycolor.module').then(m => m.QuanlycolorModule) },
  { path: 'quanlymenu', loadChildren: () => import('./features/quanlymenu/quanlymenu.module').then(m => m.QuanlymenuModule) },

  { path: 'quanlydangkynhuongquyen', loadChildren: () => import('./features/quanlydangkynhuongquyen/quanlydangkynhuongquyen.module').then(m => m.QuanlydangkynhuongquyenModule) },
  { path: 'quanlylichsuluyentap', loadChildren: () => import('./features/quanlylichsuluyentap/quanlylichsuluyentap.module').then(m => m.QuanlylichsuluyentapModule) },
  { path: 'quanlychatlieu', loadChildren: () => import('./features/quanlychatlieu/quanlychatlieu.module').then(m => m.QuanlychatlieuModule) },
  { path: 'quanlykhachhangnone', loadChildren: () => import('./features/quanlykhachhangnone/quanlykhachhangnone.module').then(m => m.QuanlykhachhangnoneModule) },
  { path: 'baocaothongke', loadChildren: () => import('./features/baocao/baocao.module').then(m => m.BaoCaoModule) },
  { path: 'quanlynguonkhachhang', loadChildren: () => import('./features/quanlynguonkhachhang/quanlynguonkhachhang.module').then(m => m.QuanlynguonkhachhangModule) },
  { path: 'quanlytudo', loadChildren: () => import('./features/quanlytudo/quanlytudo.module').then(m => m.QuanlyTuDoModule) },
  { path: 'baocaodoanhthu', loadChildren: () => import('./features/baocaodoanhthu/quanlyphieuthu.module').then(m => m.QuanlyPhieuThuModule) },
  { path: 'baocaohoiviencolichcando', loadChildren: () => import('./features/baocaocando/baocaohoiviencolichcando/baocaohoiviencolichcando.module').then(m => m.BaocaohoiviencolichcandoModule) },
  { path: 'baocaobiendongcannang', loadChildren: () => import('./features/baocaocando/baocaobiendongcannang/baocaobiendongcannang.module').then(m => m.BaocaocandoModule) },
  { path: 'baocaotrehencando', loadChildren: () => import('./features/baocaocando/baocaotrehencando/baocaotrehencando.module').then(m => m.BaocaohoiviencolichcandoModule) },
  { path: 'baocaocando', loadChildren: () => import('./features/baocaocando/baocaocando.module').then(m => m.BaocaocandoModule) },
  { path: 'quanlyvoucher', loadChildren: () => import('./features/quanlyvoucher/quanlyvoucher.module').then(m => m.QuanlyvoucherModule) },
  { path: 'quanlykhachhangtiemnang', loadChildren: () => import('./features/quanlykhachhangtiemnang/quanlykhachhangtiemnang.module').then(m => m.KhachhangtiemnangModule) },
  { path: 'baocaohoivien', loadChildren: () => import('./features/baocaohoivien/baocaohoivien.module').then(m => m.BaocaohoivienModule) },
  { path: 'quanlytonkho', loadChildren: () => import('./features/quanlytonkho/quanlytonkho.module').then(m => m.QuanLyTonKhoModule) },
  { path: 'thongtinsanphamclb', loadChildren: () => import('./features/thongtinsanphamclb/thongtinsanphamclb.module').then(m => m.ThongtinsanphamCLBModule) },


  { path: '**', redirectTo: '404',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
