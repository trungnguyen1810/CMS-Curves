import {Menu} from './menu'
export interface NhomQuyen {
    Id?:number;
    MaNhomQuyen?:string;
    TenNhomQuyen?:string;
    Menus?:Partial<Menu>[];
    TinhTrang?:number;
    MoTa?:string;
}