import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { ApiTintucService } from './api-tintuc.service';
import { AppConfig } from '../../app.config';
@Controller('mobile/noauth/nhuongquyen')
export class ApiNhuongQuyenController {
    private response: CoreResponse;
    constructor(private readonly tintucService: ApiTintucService) {
        this.response = {};
    }

    @Get('/TrangChu/:Ma')   
    async API_Mobile_NhuongQuyen_TrangChu(@Param('Ma') Ma){
        try {
            let data= await this.tintucService.API_Mobile_NhuongQuyen_TrangChu(Ma);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/DanhSachNhuongQuyen')   
    async API_Mobile_DanhSachNhuongQuyen(){
        try {
            let data= await this.tintucService.API_Mobile_DanhSachNhuongQuyen();
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }
  
    @Get('/ChiTietNhuongQuyen/:Id')   
    async API_Mobile_NhuongQuyen_ChiTiet(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id nhượng quyền',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_NhuongQuyen_ChiTiet(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/DanhSachBaiTap')   
    async API_Mobile_DanhSachBaiTap(){
        try {
            let data= await this.tintucService.API_Mobile_DanhSachBaiTap();
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/AnhGoiTap')   
    async API_Mobile_AnhGoiTap(){
        try {
            let data= await this.tintucService.API_Mobile_AnhGoiTap();
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }
  
    @Get('/ChiTietBaiTap/:Id')   
    async API_Mobile_BaiTap_ChiTiet(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id bài tập',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_BaiTap_ChiTiet(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/DanhSachGoiTap')   
    async API_Mobile_DanhSachGoiTap(){
        try {
            let data= await this.tintucService.API_Mobile_DanhSachGoiTap();
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }
  
    @Get('/ChiTietGoiTap/:Id')   
    async API_Mobile_GoiTap_ChiTiet(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id gói tập',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_GoiTap_ChiTiet(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }
    @Post('dangky')
    async DangKyLienHe(@Body() body) {
        if (!body.HoVaTen) {
            this.response.errorcode = 1;
            this.response.message = 'Tên bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }  
        if (!body.SoDienThoai) {
            this.response.errorcode = 1;
            this.response.message = 'Số điện thoại bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }         
        if (!body.Email) {
            this.response.errorcode = 1;
            this.response.message = 'Email bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }   
        if (!body.DiaChi) {
            this.response.errorcode = 1;
            this.response.message = 'Địa chỉ bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }
        if (this.IsPhone(body.SoDienThoai)  == false) {
            this.response.errorcode = 1;
            this.response.message = 'Số điện thoại sai định dạng',
            this.response.data = {};
            return this.response;
        } 
        if (this.IsEmail(body.Email)  == false) {
            this.response.errorcode = 1;
            this.response.message = 'Email sai định dạng',
            this.response.data = {};
            return this.response;
        }     
        try {
            let data = await this.tintucService.API_NhuongQuyen_DangKyLienHe(body.HoVaTen,body.SoDienThoai,body.Email,body.DiaChi);            
                this.response.errorcode = 0;
                this.response.message = 'thành công';                
                this.response.data = {};
                return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }

    @Post('dangkygoitap')
    async DangKyGoiTap(@Body() body) {
        console.log(body);
        let goitapid;
        if (!body.HoVaTen) {
            this.response.errorcode = 1;
            this.response.message = 'Tên bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }  
        if (!body.SoDienThoai) {
            this.response.errorcode = 1;
            this.response.message = 'Số điện thoại bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }         
        // if (!body.Email) {
        //     this.response.errorcode = 1;
        //     this.response.message = 'Email bắt buộc nhập',
        //     this.response.data = {};
        //     return this.response;
        // }   
        if (!body.NhuCauTapLuyen) {
            this.response.errorcode = 1;
            this.response.message = 'Nhu cầu tập luyện bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }
        if (!body.KhuVucId) {
            this.response.errorcode = 1;
            this.response.message = 'Khu vực bắt buộc chọn',
            this.response.data = {};
            return this.response;
        }
        if (!body.PhongTapId) {
            this.response.errorcode = 1;
            this.response.message = 'Phòng tập bắt buộc chọn',
            this.response.data = {};
            return this.response;
        }
        if (!body.NoiDungTinNhan) {
            this.response.errorcode = 1;
            this.response.message = 'Nội dung tin nhắn bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }
        if (!body.GoiTapId || body.GoiTapId == '' || body.GoiTapId == null) {
            // this.response.errorcode = 1;
            // this.response.message = 'Thiếu Id gói tập',
            // this.response.data = {};
            // return this.response;
            goitapid = 0;
        }  else {
            goitapid = body.GoiTapId;
        }
        if (this.IsPhone(body.SoDienThoai)  == false) {
            this.response.errorcode = 1;
            this.response.message = 'Số điện thoại sai định dạng',
            this.response.data = {};
            return this.response;
        } 
        // if (this.IsEmail(body.Email)  == false) {
        //     this.response.errorcode = 1;
        //     this.response.message = 'Email sai định dạng',
        //     this.response.data = {};
        //     return this.response;
        // }     
        try {
            let data = await this.tintucService.API_Mobile_DangKyGoiTap(body.HoVaTen,body.SoDienThoai,body.NhuCauTapLuyen, body.KhuVucId,body.PhongTapId,body.NoiDungTinNhan, goitapid);            
                this.response.errorcode = 0;
                this.response.message = 'thành công';                
                this.response.data = {};
                return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }

    IsEmail(search:string){
        var  searchfind:boolean;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        searchfind = regexp.test(search);
        if(searchfind){
            return searchfind;
        }else{
            return searchfind;
        }    
      }
      IsPhone(search:string){   
        var  searchfind:boolean;
        var regexp = new RegExp('^[0-9]+$');
        searchfind = regexp.test(search);
        if(searchfind){
            return searchfind;
        }else{
            return searchfind;
        }    
      }
}