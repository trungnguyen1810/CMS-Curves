import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { QuanLyTinTucService } from './quan-ly-tin-tuc.service'
import { TinTuc } from './tintuc.entity';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

// import {ExampleService} from './example.service';020

@Controller('admin/tintuc')
export class QuanLyTinTucController {
    private response: CoreResponse;
    constructor(private readonly quanlytintucService: QuanLyTinTucService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll() {

        try {
            let data = await this.quanlytintucService.GetTinTuc();
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { data: data[0] };
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Post('Add_Edit')
    async Edit(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        try {
            let data = await this.quanlytintucService.Them_SuaTinTuc(body.Id, body.TieuDe, body.TomTat, body.TinhTrang, body.LoaiTinTucId, body.NoiDung, body.AnhDaiDien, body.LinkChiaSe, body.HienThiTrangChu, body.ThuTuSapXep, UserId);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    //upload file

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: AppConfig.Dir_upload
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async upload(@UploadedFile() file) {
        if (!file.filename) {
            this.response.errorcode = 1;
            this.response.message = 'Upload ảnh không thành công';
            this.response.data = file;
            this.response['uploaded'] = 0;
            return this.response;
        }
        this.response.errorcode = 0;
        this.response.message = 'thành công';
        this.response.data = file;
        this.response['uploaded'] = 1;
        this.response['fileName'] = file.originalname;
        this.response['url'] = '/upload/' + file.filename;
        return this.response;
    }
    //trungnt code thêm chức năng upload ảnh chi tiết trong ckeditor  

    @Post('ckeditor_upload')
    @UseInterceptors(FileInterceptor('upload', {
        storage: diskStorage({
            destination: AppConfig.Dir_upload
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadCkeditor(@UploadedFile() file) {
        if (!file.filename) {
            this.response.errorcode = 1;
            this.response.message = 'Upload ảnh không thành công';
            this.response.data = file;
            this.response['uploaded'] = 0;
            return this.response;
        }else{
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = file;
            this.response['uploaded'] = 1;
            this.response['fileName'] = file.originalname;
            this.response['url'] = 'https://quanly.curvesvietnam.com.vn/upload/' + file.filename;
            return this.response;
        }        
    }

    @Delete('delete/:id')
    async deleteTinTuc(@Param() params) {
        try {
            let data = await this.quanlytintucService.XoaTinTuc(params.id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
}
