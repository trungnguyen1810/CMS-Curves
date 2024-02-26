import { Injectable } from '@nestjs/common';
import { TinTuc } from './tintuc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import {CoreService} from '../../baseservice/core.service';
@Injectable()
export class QuanLyTinTucService extends CoreService {
     GetTinTuc(){
       return this.QueryDB('Call NamHK_QuanLyTinTuc_TimKiem();');
     }
     Them_SuaTinTuc(Id,TieuDe, TomTat, TinhTrang, LoaiTinTucId,NoiDung,AnhDaiDien, LinkChiaSe, HienThiTrangChu, ThuTuSapXep, UserId){
      return this.QueryDB(`Call NamHK_QuanLyTinTuc_ThemMoi_UpDate(${Id},'${TieuDe}','${TomTat}',${TinhTrang},${LoaiTinTucId},'${NoiDung}','${AnhDaiDien}','${LinkChiaSe}',${HienThiTrangChu},${ThuTuSapXep},${UserId});`);
    }

    XoaTinTuc(Id){
      return this.QueryDB(`DELETE FROM tintuc WHERE Id = ${Id};`);
    }
    // constructor(

    //     @InjectRepository(TinTuc)
    //     private readonly TinTucRepo: Repository<TinTuc>,
    //   ) { }

    //   async findAll(): Promise<TinTuc[]> {
    //     return await this.TinTucRepo.find();
    //   }
    
    //   async findOne(id: number): Promise<TinTuc> {
    //     return await this.TinTucRepo.findOne(id);
    //   }
    
    //   async create(tintuc: TinTuc): Promise<TinTuc> {
    //     return await this.TinTucRepo.save(tintuc);
    //   }
}
