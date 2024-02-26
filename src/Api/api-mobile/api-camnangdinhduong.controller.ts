import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { ApiTintucService } from './api-tintuc.service';
import { AppConfig } from '../../app.config';
@Controller('mobile/noauth/camnangdd')
export class ApiCamNangDinhDuongController {
    private response: CoreResponse;
    constructor(private readonly tintucService: ApiTintucService) {
        this.response = {};
    }
    
    @Get('/ChiTiet/:Id')   
    async API_Mobile_CamNangDinhDuong_ChiTiet(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id cẩm nang dinh dưỡng',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_CamNangDinhDuong_ChiTiet(Id);
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

    @Get('/TrangChu')   
    async API_Mobile_CamNangDinhDuong_TrangChu(){
        try {
            let data= await this.tintucService.API_Mobile_CamNangDinhDuong_TrangChu();
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


    @Get('/DanhSachCamNangDinhDuong')   
    async API_Mobile_CamNangDinhDuong_DanhSach(){
        try {
            let data= await this.tintucService.API_Mobile_CamNangDinhDuong_DanhSach();
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
}