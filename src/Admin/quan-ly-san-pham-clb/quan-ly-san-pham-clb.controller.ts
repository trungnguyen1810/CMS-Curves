import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response,Headers } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLySanPhamCLBService } from './quan-ly-san-pham-clb.service'
@Controller('admin/sanphamclb')
export class QuanLySanPhamCLBController {
    private response: CoreResponse;
    constructor(private readonly service: QuanLySanPhamCLBService) {
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
    @Post('getchitiet')
    async getChiTiet(@Body() body){
        try {
            let data= await this.service.getChiTiet(body.Id);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data;
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
        let UserId = req.user.Id;
        try {
            let data = await this.service.Add_Edit(body.Id,body.TenSanPham,body.DanhMucSanPhamId,body.AnhDaiDien,body.AnhChiTiet,body.Gia,
                body.HienThi,UserId,body.MoTa,body.Color,body.Size,body.ChatLieu,body.ConHang);
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
    @Post('Edit_AnhChiTiet')
    async Edit_AnhChiTiet(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.Edit_AnhChiTiet(body.Id,body.AnhChiTiet,body.STT);
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
    @Post('xoa')
    async XoaSanPham(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.XoaSanPham(body.Id);
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

    @Post('Add_SoLuong')
    async Add_SoLuong(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.Add_SoLuong(body.Id,body.SoLuongThem,body.SoLuongBot,UserId);
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

    @Get('nhanvien_check_admin')
    async nhanvien_check_admin(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.nhanvien_check_admin(UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Get('quanlytonkho_chonsanpham')
    async v2_QuanLyTonKho_ChonSanPham(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.v2_QuanLyTonKho_ChonSanPham();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Get('quanlytonkho_getall')
    async quanlytonkho_getall(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.v2_QuanLyTonKho_GetALL(UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Get('DanhSachSanPhamCLB')
    async DanhSachSanPhamCLB(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.v2_DanhSachSanPhamCLB(UserId);
            this.response.errorcode=data[0][0].ErrorCode;
            this.response.message=data[0][0].Message;
            if(parseInt(data[0][0].ErrorCode)==0){
                this.response.data={data:data[1]};
            }else{
                this.response.data={data:[]};

            }
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Post('DanhSachDonHangSanPhamKhachHang')
    async DanhSachDonHangSanPhamKhachHang(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        try {
            let data= await this.service.v2_DanhSachDonHangSanPhamKhachHang(UserId,KhachHangId);
            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data=data[0];            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Post('CapNhatThemMoiDonHangSanPhamKhachHang')
    async CapNhatThemMoiDonHangSanPhamKhachHang(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        let DonHangId = body.DonHangId;        
       
        try {
            let data= await this.service.v2_CapNhatThemMoiDonHangSanPhamKhachHang(UserId,KhachHangId,DonHangId,body.MaVoucher,body.GiaTriVoucher,
                body.SoTienThanhToan,body.HinhThucThanhToan,body.TongTien,body.SoTienConNo,body.NgayThanhToan);
            let _donhangid = data[0][0].DonHangId;
            let SanPhams = body.ListSanPham;
            for(let i=0;i<SanPhams.length;i++){
                let item = SanPhams[i];
                await this.service.v2_ThemMoiSanPhamVaoDonHangKhachHang(UserId,KhachHangId,_donhangid,item.SanPhamId,item.GiaSanPham,item.SoLuong,body.NgayThanhToan);
            }
            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data=data[0];            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Post('XoaDonHangSanPhamKhachHang')
    async XoaDonHangSanPhamKhachHang(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        let DonHangId = body.DonHangId;
        try {
            let data= await this.service.v2_XoaDonHangSanPhamKhachHang(UserId,KhachHangId,DonHangId);
            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data={};            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Post('KiemTraMaVoucher')
    async KiemTraMaVoucher(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        let MaVoucher = body.MaVoucher;
        try {
            let data= await this.service.v2_KiemTraMaVoucher(UserId,KhachHangId,MaVoucher);
            this.response.errorcode=data[0][0].errorcode;
            this.response.message=data[0][0].message;            
            this.response.data={};            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    @Post('KiemTraMaVoucherSanPham')
    async KiemTraMaVoucherSanPham(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        let MaVoucher = body.MaVoucher;
        try {
            let data= await this.service.v2_KiemTraMaVoucherSanPham(UserId,KhachHangId,MaVoucher);
            this.response.errorcode=0;
            this.response.message='OK';            
            this.response.data={data:data[0][0]};            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    
    @Post('ChiTietDonHang')
    async ChiTietDonHang(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let DonHangId = body.DonHangId;
        try {
            let data= await this.service.v2_ChiTietDonHang(UserId,DonHangId);
            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data={donhang:data[0][0],listsanpham:data[1]};            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }
    
    
    
}
