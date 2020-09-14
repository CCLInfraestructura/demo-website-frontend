import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { Photo } from './photo';
import { InitService } from './init.service';

@Injectable()
export class PhotoService {

  WEBSITE_API = this.init.ENVVARS.WEBSITE_API

    constructor(private http: HttpClient,private init: InitService) { }


      getPhoto(body) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  //, 'Authorization': 'Bearer ' + this.initService.AuthToken 
        return this.http.post(this.WEBSITE_API +'/photo/g', body, { headers: headers })
      }
      
      getPhotosByCategoryID(searchparam) {
        let params = new HttpParams().set("bycategoryID",searchparam)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  
        return this.http.get(this.WEBSITE_API +'/photos/g', { headers: headers, params: params })
      }
    
      deletePhotoByID(searchparam) {
        let params = new HttpParams().set("byID",searchparam)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  
        return this.http.delete(this.WEBSITE_API +'/photo/d',  { headers: headers,params: params })
    
      }
    
      postPhoto(body) {
    
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  
        return this.http.post(this.WEBSITE_API +'/photo/c', body, { headers: headers })
    
      }
}