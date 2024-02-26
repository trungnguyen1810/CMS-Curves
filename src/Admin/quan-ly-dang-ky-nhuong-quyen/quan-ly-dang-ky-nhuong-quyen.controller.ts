import { Controller, Post, Get, Request, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyDangKyNhuongQuyenService } from './quan-ly-dang-ky-nhuong-quyen.service';

@Controller('admin/dangkynhuongquyen')
export class QuanLyDangKyNhuongQuyenController {
    private response: CoreResponse;

    constructor(private readonly orderservice: QuanLyDangKyNhuongQuyenService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll() {

        try {
            let data = await this.orderservice.GetALL();
            this.response.errorcode = 0;
            this.response.message = 'thành công',
            this.response.data = data[0] ;
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }
    @Post('XuLyLienHe')
    async XuLyDonHang(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.orderservice.XuLyDonHang(body.Id, UserId);
            this.response.errorcode = 0;
            this.response.message = data[0][0].message,
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('XoaLienHe')
    async deleteThongBao(@Body() body) {
        try {
            let data = await this.orderservice.Xoa(body.Id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa đăng ký nhượng quyền thành công',
                this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('baocao')
    async baocao(@Body() body,@Request() req){

        try {
            //@Body() body
            let data= await this.orderservice.BaoCao(body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
}
