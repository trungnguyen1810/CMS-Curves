import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response,Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyKhachHangTiemNangService } from './quan-ly-khach-hang-tiem-nang.service'
@Controller('admin/quanlykhachhangtiemnang')
export class QuanLyKhachHangTiemNangController {
    private response: CoreResponse;
    constructor(private readonly service: QuanLyKhachHangTiemNangService) {
        this.response = {};
    }
    @Get('getall')
    async findAll(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.GetAll(UserId);
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

    @Post('delete')
    async Delete(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.KhachHangTiemNang_Delete(body.Id);
            this.response.errorcode = 0;
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

    @Post('insert')
    async Insert(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.KhachHangTiemNang_Insert(body.Id, body.HoVaTen,body.DiaChi, body.SoDienThoai,body.GioiTinh, body.TinhTrang, body.NguonKhachHangId, body.NgheNghiep, UserId, body.ZaloFb, body.NhatKy, body.CauLacBoId, body.NgayTao);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data={};          
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Post('update')
    async Update(@Body() body,@Request() req){
        let UserId = req.user.Id;
        console.log(body);
        try {
            let data = await this.service.KhachHangTiemNang_Update(body.Id, body.HoVaTen,body.DiaChi, body.SoDienThoai,body.GioiTinh, body.TinhTrang, body.NguonKhachHangId, body.NgheNghiep, UserId, body.ZaloFb, body.CauLacBoId, body.NgayTao);
            this.response.errorcode = data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data={};          
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('getnguonkhachhang')
    async GetNguonKhachHang(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.KhachHangTiemNang_NguonKhachHang_GetAll();
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

    @Post('DanhSachNhatKyTheoHoiVien')
    async DanhSachNhatKyTheoHoiVien(@Body() body,@Request() req){
        try {
            let data= await this.service.DanhSachNhatKyTheoHoiVien(body.Id);
           
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data: data};
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('insertnhatky')
    async InsertNhatKy(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.khachhang_tiemnam_insert_nhatky(UserId,body.Id, body.ThoiGian,body.NoiDung);
            this.response.errorcode = 0;
            this.response.message='Thành công',
            this.response.data=data[0][0];          
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Post('updatenhatky')
    async UpdateNhatKy(@Body() body,@Request() req){
        try {
            let data = await this.service.khachhang_tiemnam_update_nhatky(body.Id,body.NoiDung);
            this.response.errorcode = 0;
            this.response.message='Thành công',
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
    async delete(@Param() params) {
        try {
            let data= await this.service.XoaNhatKyDiemCham(params.id);
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
