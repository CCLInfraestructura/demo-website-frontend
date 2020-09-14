import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';





@Injectable()
export class InitService {

  ENVIRONMENT: string = "local" //local //prod //cloudtest
  //ENVVARS: ENVVARS = { WEBSITE_API: "http://localhost:8082", }

 ENVVARS: ENVVARS = { WEBSITE_API: "https://ccl-website-api.herokuapp.com", }

 

  //ENVVARS: ENVVARS = { TIMESHEETS_ATTENDANCE_API: "https://cw-internal-cw-portal-poc.ocp.lab.cloudwerkstatt.com" }

  //showContents:boolean = false

  //userToken:string = ''
  //user:string=''

  constructor(private http: HttpClient) { }

  //getEnvironmentVARS retrieves the needed environment variables
  ENVVAR_API: ""

  getEnvironmentVARS(body) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });  //, 'Authorization': 'Bearer ' + this.initService.AuthToken 
    return this.http.post(this.ENVVAR_API, body, { headers: headers })

  }




}

export interface ENVVARS {
  WEBSITE_API?: string
}
