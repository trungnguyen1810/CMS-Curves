import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { ApiTintucService } from './api-tintuc.service';
import { AppConfig } from '../../app.config';
@Controller('mobile/auth/lichsucando')
export class ApiLichSuCanDoController {
    private response: CoreResponse;
    constructor(private readonly tintucService: ApiTintucService) {
        this.response = {};
    }

    @Get('/cuves/:Id')   
    async API_Mobile_ChiSoCoThe_Curves(@Param('Id') Id){
        try {
            let data= await this.tintucService.API_Mobile_ChiSoCoThe_Curves(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/chisocothe/:Id')   
    async API_Mobile_ChiSoCoThe(@Param('Id') Id){
        try {
            let data= await this.tintucService.API_Mobile_ChiSoCoThe(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={
                ChiSo : data[0],
                CanNang : data[1],
                ThanhPhanCoThe : data[2],
                CacSoDo : data[3],
            };
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/lichsucando/:Id')   
    async API_Mobile_LichSuCanDo(@Param('Id') Id){
        try {
            let data= await this.tintucService.API_Mobile_LichSuCanDo(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={
                NgayDoTiep : data[0],
                LichSu : data[1]
            };
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Get('/chitietlichsucando/:Id')   
    async API_Mobile_LichSuCanDo_ChiTiet(@Param('Id') Id){
        try {
            let data= await this.tintucService.API_Mobile_LichSuCanDo_ChiTiet(Id);
            this.response.errorcode=0;
            this.response.message='Thành công',
            this.response.data={
                ThanhPhanCoThe : data[0],
                CacSoDo : data[1]
            };
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }        
    }

    @Post('/themchisocothe')
    async API_Mobile_ThemChiSoCoThe(@Body() body, @Request() req) {
        let Id = req.user.Id;
        if (!body.NgayThemChiSo) {
            this.response.errorcode = 1;
            this.response.message = 'Tham số ngày thêm chỉ số bắt buộc nhập',
            this.response.data = {};
            return this.response;
        }       
        let Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay;
         if(!body.NgayThemChiSo){
            Ngay = '';
         } else {
            Ngay = body.NgayThemChiSo;
         }
         if(!body.CanNang){
            CanNang = '';
         } else {
            CanNang = body.CanNang;
         }
         if(!body.ChieuCao){
            ChieuCao = '';
         } else {
            ChieuCao = body.ChieuCao;
         }
         if(!body.LuongMoCoThe){
            LuongMoCoThe = '';
         } else {
            LuongMoCoThe = body.LuongMoCoThe;
         }
         if(!body.MatDoCo){
            MatDoCo = '';
         } else {
            MatDoCo = body.MatDoCo;
         }
         if(!body.MatDoXuong){
            MatDoXuong = '';
         } else {
            MatDoXuong = body.MatDoXuong;
         }
         if(!body.BMI){
            BMI = '';
         } else {
            BMI = body.BMI;
         }
         if(!body.DCI){
            DCI = '';
         } else {
            DCI = body.DCI;
         }
         if(!body.TuoiSinhHoc){
            TuoiSinhHoc = '';
         } else {
            TuoiSinhHoc = body.TuoiSinhHoc;
         }
         if(!body.LuongNuocCoThe){
            LuongNuocCoThe = '';
         } else {
            LuongNuocCoThe = body.LuongNuocCoThe;
         }
         if(!body.MoNoiTang){
            MoNoiTang = '';
         } else {
            MoNoiTang = body.MoNoiTang;
         }
         if(!body.Nguc){
            Nguc = '';
         } else {
            Nguc = body.Nguc;
         }
         if(!body.Eo){
            Eo = '';
         } else {
            Eo = body.Eo;
         }
         if(!body.Bung){
            Bung = '';
         } else {
            Bung = body.Bung;
         }
         if(!body.Mong){
            Mong = '';
         } else {
            Mong = body.Mong;
         }
         if(!body.Dui){
            Dui = '';
         } else {
            Dui = body.Dui;
         }
         if(!body.Tay){
            Tay = '';
         } else {
            Tay = body.Tay;
         }
        try {
            let data = await this.tintucService.API_Mobile_ThemChiSoCoThe(Id, Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay);            
                this.response.errorcode = data[0][0].errorcode;
                this.response.message = data[0][0].message;                
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