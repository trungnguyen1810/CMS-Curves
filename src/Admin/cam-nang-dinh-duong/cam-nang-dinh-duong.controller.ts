import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile, Delete } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {CamNangDinhDuongService} from './cam-nang-dinh-duong.service'

@Controller('admin/camnangdinhduong')
export class CamNangDinhDuongController {
    private response: CoreResponse;
    constructor(private readonly camnangService: CamNangDinhDuongService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(){

        try {
            let data= await this.camnangService.GetAll();
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
            let data= await this.camnangService.Them_Sua(body.Id,body.TenCamNang, body.NoiDung, body.AnhDaiDien, body.TinhTrang, UserId);
          
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
            let data= await this.camnangService.Xoa(params.id);
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
