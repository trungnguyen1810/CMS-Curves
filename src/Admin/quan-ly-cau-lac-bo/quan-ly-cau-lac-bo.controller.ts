import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile, Delete } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuanLyCauLacBoService } from './quan-ly-cau-lac-bo.service'
@Controller('admin/caulacbo')
export class QuanLyCauLacBoController {
    private response: CoreResponse;
    constructor(private readonly quanlyclbcService: QuanLyCauLacBoService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(){

        try {
            let data= await this.quanlyclbcService.GetCLB();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Get('gettinhthanh')
    async GetTinhThanh(){
        try {
            let data= await this.quanlyclbcService.GetTinhThanh();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
        
    }
    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlyclbcService.Them_SuaCLB(body.Id,body.TenCauLacBo, body.SoDienThoai, body.Email, body.TinhThanhId, body.DiaChi, body.TinhTrang, body.AnhDaiDien, body.SoDienThoaiZalo, body.Idmessenger,body.ThoiGianHoatDong, body.HoTen,body.DienThoai,body.EmailND, body.TenDangNhap, body.MatKhau, UserId);
            if(data[0][0].Id == -1) {
                this.response.errorcode=1;
                this.response.message='Tên đăng nhập người dùng đã tồn tại',
                this.response.data={};
            }else{
                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data={};
            }
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Delete('delete/:id')
    async deleteTinTuc(@Param() params) {
        try {
            let data= await this.quanlyclbcService.XoaCLB(params.id);
            this.response.errorcode=0;
            this.response.message='Xóa thành công',
            this.response.data={};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
}
