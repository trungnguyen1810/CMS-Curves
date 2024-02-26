import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile  } from '@nestjs/common';
import { DanhMucSanPhamService } from './danh-muc-san-pham.service'
import { CoreResponse } from './../../core.respone';
@Controller('admin/danhmucsanpham')
export class DanhMucSanPhamController {
    private response: CoreResponse;
    constructor(private readonly danhmucsanphamService: DanhMucSanPhamService) {
        this.response = {};
    }
    @Get('getall')
    async GetAll(){
        try {
            let data= await this.danhmucsanphamService.GetAll();
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
    @Post('Delete')
    async Delete(@Body() body){
        try {
            let data= await this.danhmucsanphamService.Delete(body.Id);
            this.response.errorcode=data[0][0].errorcode;
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
    @Post('Add_Edit')
    async Add_Edit(@Body() body,@Request() req){
        try {
            let UserId = req.user.Id; 
            let data= await this.danhmucsanphamService.Add_Edit(body.Id,body.TenDanhMuc,body.TinhTrang,body.AnhDaiDien,UserId);
            console.log(data);
            this.response.errorcode=data[0][0].errorcode;
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
