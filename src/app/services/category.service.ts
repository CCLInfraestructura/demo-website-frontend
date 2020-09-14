import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  WEBSITE_API = this.init.ENVVARS.WEBSITE_API

  constructor(private http: HttpClient,private init: InitService) { }

  getCategory(body) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  //, 'Authorization': 'Bearer ' + this.initService.AuthToken 
    return this.http.post(this.WEBSITE_API + '/category/g', body, { headers: headers })

  }
  
  getCategories() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  
    return this.http.get( this.WEBSITE_API +  '/categories/g', { headers: headers })
  }

  updateCategoryByID(searchparam, body) {
    let params = new HttpParams().set("byID",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
    return this.http.put(this.WEBSITE_API +'/category/u', body,{ headers: headers, params: params })

  }

  deleteCategoryByID(searchparam) {
    let params = new HttpParams().set("byID",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
    return this.http.delete(this.WEBSITE_API +'/category/d', { headers: headers, params: params })

  }

  postCategory(body) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
    return this.http.post(this.WEBSITE_API +'/category/c', body, { headers: headers })

  }

}
