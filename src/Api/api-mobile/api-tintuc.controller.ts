import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ApiTintucService } from './api-tintuc.service';
import { AppConfig } from './../../app.config';
@Controller('mobile/noauth/tintuc')
export class ApiTinTucController {
    private response: CoreResponse;
    constructor(private readonly tintucService: ApiTintucService) {
        this.response = {};
    }

    @Get('/DanhSachTheoLoai/:Id')   
    async GetTinTuc(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai loại tin tức',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.GetTinTuc(Id);
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

    @Get('/ChiTietTinTucKhuyenMai/:Id')   
    async GetChiTietTinTuc(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id tin tức',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.GetChiTietTinTuc(Id);
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

    @Get('/TinTucKhuyenMaiLienQuan/:Id')   
    async TinTucKhuyenMaiLienQuan(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id tin tức',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.TinTucKhuyenMaiLienQuan(Id);
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

    @Get('/TinTucKhuyenMaiTrangChu')   
    async TinTucKhuyenMaiTrangChu(){
        try {
            let data= await this.tintucService.TinTucKhuyenMaiTrangChu();
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
}