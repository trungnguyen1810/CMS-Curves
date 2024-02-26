import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile, Delete   } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { DanhMucDiaBanService } from './danh-muc-dia-ban.service'
@Controller('admin/diaban')
export class DanhMucDiaBanController {
    private response: CoreResponse;
    constructor(private readonly danhmucdiabanService: DanhMucDiaBanService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(){

        try {
            let data= await this.danhmucdiabanService.GetDiaBan();
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

    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.danhmucdiabanService.Them_SuaDiaBan(body.Id,body.TenDiaBan,body.TinhTrang,body.AnhDaiDien,UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={};
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
            let data= await this.danhmucdiabanService.XoaDiaBan(params.id);
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
