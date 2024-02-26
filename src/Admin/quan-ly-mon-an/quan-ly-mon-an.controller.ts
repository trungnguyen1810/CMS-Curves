import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response,Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyMonAnService } from './quan-ly-mon-an.service'


@Controller('admin/monan')
export class QuanLyMonAnController {
    private response: CoreResponse;
    constructor(private readonly quanly: QuanLyMonAnService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll() {

        try {
            let data = await this.quanly.GetALL();
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('getmonanphu')
    async GetMonAnPhu() {

        try {
            let data = await this.quanly.GetMonAnPhu();
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Post('Add_Edit')
    async Edit(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        try {
            let data = await this.quanly.MonAn_Them_Sua(body.Id, body.TenMonAn, body.DonViId, body.Calo, body.MoTa, UserId);

            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = {};

            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Delete('delete/:id')
    async delete(@Param() params) {
        try {
            let data = await this.quanly.Delete(params.id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('deletenhieumonan')
    async DeleteNhieuMonAn(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.quanly.DeleteNhieuMonAn(body.strId);
            this.response.errorcode = 0;
            this.response.message = 'Xóa danh sách món ăn thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    
    @Post('chuyenmonan')
    async ChuyenMonAn(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.quanly.ChuyenMonAn(body.Id, UserId);
            this.response.errorcode = 0;
            this.response.message = 'chuyển món ăn sang danh sách món ăn chính thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Get('getDonVi')
    async getDonVi() {
        try {
            let data = await this.quanly.GetDonVi();
            this.response.errorcode = 0;
            this.response.message = 'get thành công';
            this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('import')
    async Import(@Body() body, @Request() req) {
        try {
            let Arr_Err = [];
            let UserId = req.user.Id;
            let Arr_MonAn = body.data;
            let err = false;
            for (let i = 0; i < Arr_MonAn.length; i++) {
                let item = Arr_MonAn[i];
                Arr_Err.push(item);
                let NoiDungLoi = '';
                if (item.TenMonAn == undefined) {
                    item.TenMonAn = '';
                }
                if (item.DonVi == undefined) {
                    item.DonVi = '';
                }
                if (item.Calo == undefined||item.Calo==null) {
                    item.Calo= '';
                }
                if (item.MoTa == undefined) {
                    item.MoTa = '';
                }
                if (!item.TenMonAn) {
                    NoiDungLoi = 'Tên món ăn bắt buộc nhập;';
                }
                Arr_MonAn[i] = item;                
                if (isNaN(item.Calo)) {
                    NoiDungLoi += 'Calo phải để dạng số;';
                }
                if(item.Calo === ''){
                    NoiDungLoi += 'Calo bắt buộc nhập;';
                }
                if(item.DonVi==''){
                    NoiDungLoi += 'Đơn vị bắt buộc nhập;';
                }
                if (item.MoTa.length > 300) {
                    NoiDungLoi += 'Mô tả phải nhỏ hơn 300 ký tự';
                }
                let item_loi = {TenMonAn:item.TenMonAn,DonVi:item.DonVi,Calo:item.Calo,NoiDungLoi:NoiDungLoi.trim()};
                Arr_Err[i]=item_loi;
                if (NoiDungLoi.trim() != '') {
                    err = true;                    
                }
            }
            if (err) {
                this.response.errorcode = 2;
                this.response.message = 'Có dữ liệu lỗi,vui lòng kiểm tra và điều chỉnh lại file import';
                this.response.data = { dataloi: Arr_Err };
                return this.response;
            } else {
                for (let i = 0; i < Arr_MonAn.length; i++) {    
                    let item = Arr_MonAn[i];               
                    this.quanly.MonAn_Them_Sua_Import(item.TenMonAn, item.DonVi, item.Calo, item.MoTa, UserId);
                }
                this.response.errorcode = 0;
                this.response.message = 'import món ăn thành công';
                this.response.data = {};
                return this.response;
            }

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
}
