import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ThucDonThamKhaoService } from './thuc-don-tham-khao.service';

@Controller('admin/thucdonthamkhao')
export class ThucDonThamKhaoController {
    private response: CoreResponse;
    constructor(private readonly service: ThucDonThamKhaoService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(){

        try {
            let data= await this.service.GetALL();
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

    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.ThucDonThamKhao_Check_ThemMoi_Edit(body.Ngay,body.BuaId,body.IsAdd,body.CurrentBuaId);
            if(Number(data[0][0].errorcode)==0){
                for(let i=0;i<body.ListMonAnId.length;i++){
                    if(body.SoLuong[i]>0){
                        this.service.ThemMoiThucDon(body.Ngay,body.BuaId, body.ListMonAnId[i],body.SoLuong[i], UserId); 
                    }
                }
                this.response.errorcode=0;
                this.response.message = data[0][0].message,
                this.response.data={};
                return this.response;
            }else{
                this.response.errorcode=1;
                this.response.message=data[0][0].message;
                this.response.data={};
                return this.response;
            }
            
           
            
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('XemChiTiet')
    async XemChiTiet(@Body() body) {
        try {
            let data= await this.service.XemChiTiet(body.Ngay,body.BuaId);
            this.response.errorcode=0;
            this.response.message='get thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('delete')
    async deleteThamKhao(@Body() body) {
        try {
            let data= await this.service.Delete(body.NgayThamKhao,body.BuaId);
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
    @Get('getMonAn')
    async getMonAn() {
        try {
            let data= await this.service.GetMonAn();
            this.response.errorcode=0;
            this.response.message='get thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('getMonAnEdit')
    async getMonAnEdit(@Body() body) {
        try {
            let data= await this.service.getMonAnEdit(body.Ngay,body.BuaId);
            this.response.errorcode=0;
            this.response.message='get thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    //trungnt code theo khach hang yeu cau 26/12/2020
    @Post('GetDanhSachBuaAnTheoNgay')
    async GetDanhSachBuaAnTheoNgay(@Body() body) {
        try {
            let data= await this.service.GetDanhSachBuaAnTheoNgay(body.Ngay);
            this.response.errorcode=0;
            this.response.message='get thành công',
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('ThemMoiTenBuaAnTheoNgay')
    async ThemMoiTenBuaAnTheoNgay(@Body() body) {
        try {
            let data= await this.service.ThemMoiTenBuaAnTheoNgay(body.Ngay,body.TenBuaAn);
            this.response.errorcode=data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('EditTenBuaAnTheoNgay')
    async EditTenBuaAnTheoNgay(@Body() body) {
        try {
            let data= await this.service.EditTenBuaAnTheoNgay(body.TenBuaAn,body.ThuTuSapXep,body.Id);
            this.response.errorcode=data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('XoaBuaAnTheoNgay')
    async XoaBuaAnTheoNgay(@Body() body) {
        try {
            let data= await this.service.XoaBuaAnTheoNgay(body.Id);
            this.response.errorcode=data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    @Post('CopyThucDon')
    async CopyThucDon(@Body() body) {
        try {
            let data= await this.service.CopyThucDon(body.TuNgay,body.SangNgay);
            this.response.errorcode=data[0][0].errorcode;
            this.response.message=data[0][0].message,
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    
    
    
}
