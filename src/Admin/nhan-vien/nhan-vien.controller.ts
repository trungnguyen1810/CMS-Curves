import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { NhanVienService } from './nhan-vien.service'
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';

@Controller('admin/user')
export class NhanVienController {
    private response: CoreResponse;
    constructor(private readonly nhanvienService: NhanVienService) {
        this.response = {};
    }

    @Get('getall')
    async findAll() {
        try {
            let data = await this.nhanvienService.findAll();
            this.response.errorcode = 0;
            this.response.message = 'get thành công';
            this.response.data = data[0];
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = error.toString();
            this.response.data = [];
        }
        return this.response;
    }
    @Get('getnhomquyen')
    async getNhomQuyen() {
        try {
            let data = await this.nhanvienService.getNhomQuyen();
            this.response.errorcode = 0;
            this.response.message = 'get thành công';
            this.response.data = data;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = error.toString();
            this.response.data = [];
        }
        return this.response;
    }
    @Get('getcaulacbo')
    async getCauLacBo() {
        try {
            let data = await this.nhanvienService.getCauLacBo();
            this.response.errorcode = 0;
            this.response.message = 'get thành công';
            this.response.data = data;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = error.toString();
            this.response.data = [];
        }
        return this.response;
    }
    @Post('Add_Edit')
    async Add_Edit(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.nhanvienService.Add_Edit(body.Id, body.HoVaTen, body.TenDangNhap, body.MatKhau, body.Email, body.SoDienThoai, body.TinhTrang, body.NhomQuyenId,body.CauLacBoId, UserId);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'Có lỗi xảy ra: ' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('Delete')
    async Delete(@Body() body) {
        try {
            let data = await this.nhanvienService.Delete(body.Id);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'Có lỗi xảy ra: ' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Post('login')
    async UserLogin(@Body() login) {
        let data = await this.nhanvienService.login(login);
        if (data[0].length > 0) {
            if (data[0][0].TinhTrang == 0) {
                this.response.errorcode = 1;
                this.response.message = 'Tài khoản ' + data[0][0].TenDangNhap + ' hiện đang bị khóa,vui lòng liên hệ lại với ban quản trị';
                this.response.data = {};
            } else {


                this.response.errorcode = 0;
                this.response.message = 'đăng nhập thành công';
                let data_res = {
                    token: jwt.sign({ user: data[0][0] }, AppConfig.Key_Token_QuanTri, { expiresIn: AppConfig.Time_Expire_QuanTri }),
                    user: data[0][0]
                }
                this.response.data = data_res;
            }
        } else {
            this.response.errorcode = 1;
            this.response.message = 'sai tên đăng nhập hoặc mật khẩu';
            this.response.data = data[0];
        }
        return this.response;
    }
    @Get('/getmenu')
    async GetMenu(@Request() req) {
        let userId = req.user.Id;
        let data = await this.nhanvienService.getMenuUser(userId);
        this.response.errorcode = 0;
        this.response.message = 'Thành công';
        this.response.data = data[0];
        return this.response;
    }
    @Get('/getdataheader')
    async GetHeader(@Request() req) {
        let userId = req.user.Id;
        let data = await this.nhanvienService.GetHeader(userId);
        this.response.errorcode = 0;
        this.response.message = 'Thành công';
        this.response.data = data[0][0];
        return this.response;
    }
    
}
