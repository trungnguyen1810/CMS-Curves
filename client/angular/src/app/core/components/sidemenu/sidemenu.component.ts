import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AppSettings } from '../../constants/Const';
import {Menu} from './menu.interface';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  menus:Menu[];
  searchText :string;
  items: MenuItem[];

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) {
    if(this.authenticationService.currentUserValue){
      this.GetMenu();

    }
   }

  ngOnInit(): void {
  }
  GetMenu() {
    this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/user/getmenu`).subscribe(data => {
      if (data.errorcode == 0) {
        this.menus = data.data;
        this.items = this.toTree(this.menus,null);
        console.log(this.items)
      } else {
        alert(data.message);
      }
    })
  }

  toTree (data, root) {
    var r = [], o = {};
    data.forEach(function (a) {
        if (o[a.Id] && o[a.Id].items) {
            a.items = o[a.Id] && o[a.Id].items;
        }
        o[a.Id] = a;
        if (a.Parent_Id==root) {
          a.label = a.Name;
          a.routerLink = a.Url;
          a.icon = a.IconClass;
            r.push(a);
        } else {
            o[a.Parent_Id] = o[a.Parent_Id] || {};
            o[a.Parent_Id].items = o[a.Parent_Id].items || [];
            a.label = a.Name;
            a.routerLink = a.Url;
            a.icon = a.IconClass;
            o[a.Parent_Id].items.push(a);
        }
    });
    return r;
};

}
