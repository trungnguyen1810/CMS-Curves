import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ApiMobileService } from './api-mobile.service';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
@Controller('mobile')
export class ApiSanPhamController {
    private response: CoreResponse;
    constructor(private readonly apiService: ApiMobileService) {
        this.response = {};
    }
    @Post('noauth/sanpham/listsanphamtheodanhmuc')
    async GetListProductByCategory(@Body() body) {
        if (!body.DanhMucSanPhamId) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số DanhMucSanPhamId bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.GetListProductByCategory(body.DanhMucSanPhamId);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { danhsachsanpham: data[0] };
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('noauth/sanpham/chitietsanpham')
    async GetDetailProduct(@Body() body) {
        if (!body.SanPhamId) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số SanPhamId bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.ChiTietSanPham(body.SanPhamId);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { SanPham: data[0], Sizes: data[1], Colors: data[2], Material: data[3] };
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('noauth/sanpham/createOrder')
    async createOrder(@Body() body) {
        if (!body.SanPhamId) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số SanPhamId bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        if (!body.TenKhachHang) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số TenKhachHang bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.SoDienThoai) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số SoDienThoai bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        if (!body.DiaChi) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số DiaChi bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        if(!body.SoLuong){
            body.SoLuong=0;
        }
        
        try {
            let data = await this.apiService.DatHang(body.SanPhamId, body.TenKhachHang, body.SoDienThoai, body.DiaChi, body.GhiChu, JSON.stringify(body.Option), body.SoLuong,body.CauLacBoId);
            this.response.errorcode = 0;
            this.response.message = 'Đặt hàng thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

}
