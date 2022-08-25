import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { AddonService} from './addon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Location, PopStateEvent } from "@angular/common";
import { config } from 'src/app/app.config';

@Component({
    selector: 'addon',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss'],
    providers: [AddonService]
})
export class AddonComponent implements OnInit{
    // installing = false;
    // showReset = false;
    // panelOpenState = false;
    // icon = false;
    // toggleArrow = false;
    iframeCookieVersionSrc;
    iframeSRC;
    tempSrc;
    iframesDic = {};
    newStudioURL;
    view;
    // Data sent from webapp
    // @Input() queryParams: any;
    // @Input() routerData: any;
    // @Input() containerHeight: any;
    // @Input() addonData: any;
    
    private userRole: any;
    private addon: any;

    private _hostObject = null;
    @Input()
    set hostObject(value: any) {
      this._hostObject = value;
    }
    get hostObject(): any {
      return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter();    

    // protected paramsSubscription: Subscription;
    // protected locationSubscription: SubscriptionLike;

    constructor(
        public addonService: AddonService
      , public routeParams: ActivatedRoute
      , public router: Router
      , private sanitizer: DomSanitizer
      , public location: Location

      ) {
        this.addonService.addonUUID = config.AddonUUID;
        
        // this.locationSubscription = this.location.subscribe((e: PopStateEvent) => {
        //     if (this.paramsSubscription) {
        //         this.paramsSubscription.unsubscribe();
        //     }

        //     this.paramsSubscription = this.router.events.pipe(
        //         filter(event => event instanceof NavigationEnd)
        //         ).subscribe((event: any) => {
        //             this.popStateReload(event);
        //         }
        //     );
        // });
    }
    
    async ngOnInit() {
        // debugger;
        // console.log('init container height ' + this.containerHeight);    
        this.fillSrcArray();
        this.newStudioURL = await this.addonService.papiClient.get('/configuration_fields?key=NewStudioUrl');

        let params = (new URL(window.location.href)).searchParams;
        this.view = params.get("view");
// debugger;
        if (this.view) {
            if (!this.addon) {
                this.addonService.papiClient.addons.installedAddons.get(this.addonService.addonUUID).then(addon => {
                    this.addon = addon;
                    const frameSrc = this.newStudioURL.Value + '/' +  'cookieVersion.html?ver=' +  this.addon.Version;
                    // this.iframeCookieVersionSrc = this.sanitizer.bypassSecurityTrustResourceUrl(frameSrc);    
                    this.iframeCookieVersionSrc = frameSrc;    
        
                    this.tempSrc = this.newStudioURL.Value + '/' + this.iframesDic[this.view] ;
                    // this.tempSrc = "http://localhost/" + this.iframesDic[this.view] ;    
                    const signToadd = this.tempSrc.indexOf('?') > -1 ? '&' : '?';
                    this.tempSrc += signToadd + 'webAppIframe=true';
        
                    setTimeout(() => {
                        // this.iframeSRC = this.sanitizer.bypassSecurityTrustResourceUrl(this.tempSrc);
                        this.iframeSRC = this.tempSrc;
                    }, 50);
                });
            }
        }
    }

    ngOnChanges(changes){
        // // console.log('changes container height '+this.containerHeight);
        // if (changes) {
            
        // }
    }

    // popStateReload(event: any) {
    //     let params = (new URL(window.location.href)).searchParams;
    //     this.view = params.get("view");

    //     if (this.view !== "form") {
            
    //     }
    // } 

    // tabClick($event) {
    //     // Implement: Tab navigate function
    // }

    fillSrcArray() {
        const parsedToken = this.addonService.getParsedToken();
        this.userRole = parsedToken["pepperi.employeetype"];  

        // console.log('init container height ' + this.userRole);
        if (this.userRole===301)//VARADMIN
        {
            // Distributors Setup
            this.iframesDic['var_distributors'] = 'app/default.aspx?uri=grid/vardistributors'; // Var Distributors

            // Logs
            this.iframesDic['var_pepperi_system'] = 'Views/Vars/PepperiSystem.aspx'; // Var Pepperi System
            this.iframesDic['var_pepperi_operation'] = 'Views/Vars/PepperiOperation.aspx'; // Var Pepperi Operation

            // Manage
            this.iframesDic['var_atd_templates'] = 'Views/Vars/ActivityTypeDefinitionTemplate.aspx'; // Var ATD Templates
            this.iframesDic['var_ui_control_field_bank'] = 'Views/Vars/UIControlMapper.aspx'; // Var UI Control Field Bank
            this.iframesDic['var_ui_control_properties'] = 'Views/Vars/UIControlSetting.aspx'; // Var UI Control Properties
            this.iframesDic['var_features_visibility'] = 'Views/Vars/FeaturesController.aspx'; // Var Features Visibility
            this.iframesDic['var_manage_campaigns'] = 'Views/Vars/CampaignManage.aspx'; // Var Manage Campaigns
            this.iframesDic['var_old_workflow_migration'] = 'Views/Vars/OldWorkflowMigration.aspx'; // Var Old Workflow Migration
            this.iframesDic['var_purge_tables_data'] = 'Views/Vars/PurgeTablesData.aspx'; // Var Purge Tables Data
            this.iframesDic['var_generic_list_migrationPage'] = 'Views/Vars/GenericListMigrationPage.aspx'; // Var Generic List Migration
            this.iframesDic['var_manage_addons'] = 'app/default.aspx?uri=grid/addonmanager'; // Var Manage Addons 

            // Configuration Details
            this.iframesDic['var_configurations_details'] = 'Views/Vars/ConfigurationsDetails.aspx'; // Var Configuration Details

            // Create New Distributor
            this.iframesDic['var_create_new_distributor'] = 'Views/Vars/DistributorAccount.aspx'; // Var Create New Distributor
        }
    }
}
