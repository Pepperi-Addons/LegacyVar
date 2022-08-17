import jwt from 'jwt-decode';
import { CodeJob, PapiClient, AuditLog } from '@pepperi-addons/papi-sdk';
import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
//@ts-ignore
//import {UserService} from 'pepperi-user-service';
//@ts-ignore
//import { PepperiRowData, PepperiFieldData, FIELD_TYPE } from 'pepperi-main-service';
// @ts-ignore
//import {EnvVariables} from 'pepperi-environment-variables';
// @ts-ignore
//import {AddonService} from 'pepperi-addon-service';
import { MatDialogConfig, MatDialog } from '@angular/material';
//@ts-ignore
//import {PepperiDataConverterService} from 'pepperi-data-converter';

@Injectable()
export class PluginService {

  subscription: any;
  accessToken = '';
  parsedToken: any;
  papiBaseURL = '';
  version;
  pluginUUID;
  FIELD_TYPE = FIELD_TYPE;
  EnvVariables = EnvVariables;

  get papiClient(): PapiClient {
    return new PapiClient({
        baseURL: this.papiBaseURL,
        token: this.addonService.getUserToken(),
        addonUUID: this.pluginUUID,
        suppressLogging:true
    })
}

  constructor(
              private http: Http
            , public userService: UserService
            ,public addonService:  AddonService
            ,public dialog: MatDialog
            ,public pepperiDataConverter: PepperiDataConverterService
    ) {
      const accessToken = this.addonService.getUserToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"];
  }

  ngOnInit() {
  }

  getParsedToken(){
    const accessToken = this.addonService.getUserToken();
    return jwt(accessToken);        
  }

  getAdditionalData(successFunc, errorFunc) {
    this.userService.httpGetApiCall('/addons/installed_addons/'+ this.pluginUUID, successFunc, errorFunc);
  }


  updateAdditionalData(additionalData: any, successFunc, errorFunc = null) {
    let body = ({
      "Addon": {"UUID": this.pluginUUID},
      "AdditionalData": JSON.stringify(additionalData)
    });
    this.userService.httpPostApiCall('/addons/installed_addons', body, successFunc, errorFunc);
  }

  updateSystemData(body: any, successFunc, errorFunc = null) {
    this.userService.httpPostApiCall('/addons/installed_addons' , body, successFunc, errorFunc);
  }

}




