import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { ApiTintucService } from './api-tintuc.service';
import { AppConfig } from '../../app.config';
@Controller('mobile/noauth/clb')
export class ApiCauLacBoController {
    private response: CoreResponse;
    constructor(private readonly tintucService: ApiTintucService) {
        this.response = {};
    }

    @Get('/CauLacBo_DSQuanTam/:Id')   
    async GetTinTuc(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id câu lạc bộ',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_CauLacBo_DSQuanTam(Id);
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

    @Get('/CauLacBo_ChiTiet/:Id')   
    async API_Mobile_CauLacBo_ChiTiet(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id câu lạc bộ',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_CauLacBo_ChiTiet(Id);
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

    @Get('/DanhSachCLBTheoTinhThanh/:Id')   
    async API_Mobile_DanhSachCLBTheoTinhThanh(@Param('Id') Id){
        try {
            if(isNaN(Number(Id))){
                this.response.errorcode=1;
                this.response.message='Sai Id tỉnh thành',
                this.response.data={};
                return this.response;
            };
            let data= await this.tintucService.API_Mobile_DanhSachCLBTheoTinhThanh(Id);
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

    @Post('CauLacBoTimKiem')
    async API_Mobile_CauLacBo_TimKiem(@Body() body) {
        if (!body.NoiDungTimKiem) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số nội dung tìm kiếm bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }        
        try {
            let data = await this.tintucService.API_Mobile_CauLacBo_TimKiem(body.NoiDungTimKiem);            
                this.response.errorcode = 0;
                this.response.message = 'thành công';                
                this.response.data = data[0];
                return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }

    @Get('/DanhSachCauLacBo')   
    async API_Mobile_DanhSachCauLacBo(){
        try {
            let data= await this.tintucService.API_Mobile_DanhSachCauLacBo();
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