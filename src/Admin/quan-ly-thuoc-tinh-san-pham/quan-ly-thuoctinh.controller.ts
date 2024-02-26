import { Controller, Post, Get, Request, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyThuocTinhService } from './quan-ly-thuoctinh.service'
@Controller('admin/thuoctinh')
export class QuanLyThuocTinhController {
    private response: CoreResponse;
    constructor(private readonly service: QuanLyThuocTinhService) {
        this.response = {};
    }

    @Get('color/getall')
    async FindColorAll() {

        try {
            let data = await this.service.FindColorAll();
            this.response.errorcode = 0;
            this.response.message = 'thành công',
                this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('size/getall')
    async FindSizeAll() {

        try {
            let data = await this.service.FindSizeAll();
            this.response.errorcode = 0;
            this.response.message = 'thành công',
                this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('chatlieu/getall')
    async FindChatLieuAll() {

        try {
            let data = await this.service.FindChatLieuAll();
            this.response.errorcode = 0;
            this.response.message = 'thành công',
                this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('color/Add_Edit')
    async EditColor(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.service.Them_SuaColor(body.Id, body.TenMau, body.MaMau);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message,
                this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('size/Add_Edit')
    async EditSize(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.service.Them_SuaSize(body.Id, body.TenSize);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('chatlieu/Add_Edit')
    async EditChatLieu(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.service.Them_SuaChatLieu(body.Id, body.TenSize);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('xoacolor')
    async deleteColor(@Body() body) {
        try {
            let data = await this.service.deleteColor(body.Id);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('xoasize')
    async deleteSize(@Body() body) {
        try {
            let data = await this.service.deleteSize(body.Id);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('xoachatlieu')
    async deleteChatLieu(@Body() body) {
        try {
            let data = await this.service.deleteChatLieu(body.Id);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message;
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
