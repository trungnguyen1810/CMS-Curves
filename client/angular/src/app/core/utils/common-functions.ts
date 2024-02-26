export function IsEmail(search:string){
    if(!search){
        return {Error:1,Message:'Email không được để trống'};
    }    
    var  searchfind:boolean;
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    searchfind = regexp.test(search);
    if(searchfind){
        return {Error:0,Message:'Email hợp lệ'};
    }else{
        return {Error:2,Message:'Email không đúng định dạng'};
    }    
}
export function IsNumber(search){
    if(!search){
        return {Error:1,Message:'không được để trống'};
    }    
    var  searchfind:boolean;
    var regexp = new RegExp('^[0-9]+$');
    searchfind = regexp.test(search);
    if(searchfind){
        return {Error:0,Message:'Là số hợp lệ'};
    }else{
        return {Error:2,Message:'Không phải là số'};
    }    
}
export function IsFloat(search){
    var  searchfind:boolean;   
    var regexp = /^-?\d*\.?\d*$/;
    searchfind = regexp.test(search);
    if(searchfind){
        return {Error:0,Message:'Là số thập phân'};
    }else{
        return {Error:1,Message:'Không phải là số thập phân'};
    }    
}
export function IsPhone(search:string){
    if(!search){
        return {Error:1,Message:'không được để trống'};
    }    
    var  searchfind:boolean;
    var regexp = new RegExp('^[0-9]+$');
    searchfind = regexp.test(search);
    if(searchfind){
        return {Error:0,Message:'Là số điện thoại hợp lệ'};
    }else{
        return {Error:2,Message:'Không phải là số điện thoại'};
    }    
}
export function convertDateObjToDMY(obj){
    //example :convert Wed Dec 16 2020 00:00:00 GMT+0700 (Indochina Time) -> 05/12/2020
    var d = new Date(obj);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
    
}
export function convertDateObjToYMD(obj){
    //example :convert Wed Dec 16 2020 00:00:00 GMT+0700 (Indochina Time) -> 2020/12/05
    var d = new Date(obj);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
    
}