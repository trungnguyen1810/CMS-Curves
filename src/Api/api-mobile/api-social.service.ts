import { Injectable } from '@nestjs/common';
import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class ApiSocialService extends CoreService {
    async Login(Email,MaMay,HeDieuHanh,Tokenfirebase){
        return await this.QueryDB(`call API_Login_Social('${Email}','${MaMay}','${HeDieuHanh}','${Tokenfirebase}');`)
    }
    
}