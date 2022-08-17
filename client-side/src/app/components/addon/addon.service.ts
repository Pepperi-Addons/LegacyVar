import jwt from 'jwt-decode';
import { PapiClient,  } from '@pepperi-addons/papi-sdk';
import { Injectable} from '@angular/core';
import { PepAddonService, PepHttpService, PepSessionService } from '@pepperi-addons/ngx-lib';

@Injectable({ 
    providedIn: 'root' 
})
export class AddonService {
    subscription: any;
    accessToken = '';
    parsedToken: any;
    papiBaseURL = '';
    version;
    addonUUID;
    // FIELD_TYPE = FIELD_TYPE;
    // EnvVariables = EnvVariables;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.addonUUID,
            suppressLogging:true
        })
    }

    constructor(
        public session:  PepSessionService,
        public httpService: PepHttpService,
        public addonService: PepAddonService
              
      ) {
            const accessToken = this.session.getIdpToken();
            this.parsedToken = jwt(accessToken);
            this.papiBaseURL = this.parsedToken["pepperi.baseurl"];
    }

    ngOnInit() {
    }

    getParsedToken(){
        const accessToken = this.session.getIdpToken();
        return jwt(accessToken);        
    }
}




