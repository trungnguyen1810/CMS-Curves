import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response,Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {CoreService} from '../../baseservice/core.service';
import { QuanLyNhomQuyenService } from './quan-ly-nhom-quyen.service'
@Controller('admin/nhomquyen')
export class QuanLyNhomQuyenController {
    private response: CoreResponse;
    constructor(private readonly nhomquyenService: QuanLyNhomQuyenService) {
        this.response = {};
    }
    @Get('getall')
    async findAll(){
        try {
            let data= await this.nhomquyenService.findAll();
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
    @Get('getallmenu')
    async getAllMenu(){
        try {
            let data= await this.nhomquyenService.getAllMenu();
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
    @Post('Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.nhomquyenService.Edit(body.Id,body.MaNhomQuyen,body.TenNhomQuyen,body.TinhTrang,body.MoTa,body.ListMenuId,UserId);
            let message = 'Thêm mới nhóm quyền thành công';
            if(body.Id>0){
                message = 'Sửa nhóm quyền thành công';
            }
            this.response.errorcode=0;
            this.response.message=message,
            this.response.data={};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('GetNhomQuyenMenu')
    async GetNhomQuyenMenu(@Body() body){
        try {
            let data= await this.nhomquyenService.GetNhomQuyenMenu(body.NhomQuyenId);
            console.log(data);
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
    @Post('XoaNhomQuyen')
    async XoaNhomQuyen(@Body() body){
        try {
            let data= await this.nhomquyenService.XoaNhomQuyen(body.Id);
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
    
    
}
