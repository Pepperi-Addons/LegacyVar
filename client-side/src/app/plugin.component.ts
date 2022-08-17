import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation,
  Compiler, ViewChild, ComponentRef, ElementRef  } from '@angular/core';
import { PluginService} from './plugin.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Location, PopStateEvent } from "@angular/common";
import { filter } from 'rxjs/operators';
// @ts-ignore
// import { SharedModule } from 'pepperi-shared';



@Component({
selector: 'plugin',
templateUrl: './plugin.component.html',
styleUrls: ['./plugin.component.scss'],
providers: [PluginService],
encapsulation: ViewEncapsulation.None
})



export class PluginComponent implements OnInit{

installing = false;
showReset = false;
panelOpenState = false;
icon = false;
toggleArrow = false;
iframeCookieVersionSrc;
iframeSRC;
tempSrc;
iframesDic = {};
newStudioURL;
view;
// Data sent from webapp
@Input() queryParams: any;
@Input() routerData: any;
@Input() containerHeight: any;
@Input() addonData: any;
@Input() userRole: any;
// Events emitters to webapp
@Output() addEditors: EventEmitter<any> = new EventEmitter<any>();
@Output() notify: EventEmitter<any> = new EventEmitter<any>();

protected paramsSubscription: Subscription;
protected locationSubscription: SubscriptionLike;


constructor(
    public pluginService: PluginService
  , public routeParams: ActivatedRoute
  , public router: Router
  , public compiler: Compiler
  , private sanitizer: DomSanitizer
  , public location: Location

  ) {
  const self = this;
  
  // Parameters sent from url
  this.routeParams.params.subscribe(params => {
    self.pluginService.pluginUUID = params.pluginID;
  });
  
  this.locationSubscription = this.location.subscribe( (e: PopStateEvent) => {
      if (self.paramsSubscription) {
        self.paramsSubscription.unsubscribe();
      }

      self.paramsSubscription = self.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
          self.popStateReload(event);
        });
    });
}

async ngOnInit() {
  // console.log('init container height ' + this.containerHeight);    
  const self =this;
  this.fillSrcArray();
  this.newStudioURL = await self.pluginService.papiClient.get('/configuration_fields?key=NewStudioUrl');
  this.routeParams.queryParams.subscribe(queryParams => {
    //self.showReset = queryParams.showReset;
    
    const frameSrc = self.newStudioURL.Value + '/' +  'cookieVersion.html?ver=' +  self.addonData.Version;;
    self.iframeCookieVersionSrc = self.sanitizer.bypassSecurityTrustResourceUrl(frameSrc);    

    self.view = queryParams["view"];
    self.tempSrc = self.newStudioURL.Value + '/' + self.iframesDic[self.view] ;
    //self.tempSrc = "http://localhost/" + self.iframesDic[self.view] ;    
    const signToadd = self.tempSrc.indexOf('?') > -1 ? '&' : '?';
    self.tempSrc += signToadd + 'webAppIframe=true';

    setTimeout(function () {self.iframeSRC = self.sanitizer.bypassSecurityTrustResourceUrl(self.tempSrc);}, 50);
  });
}

ngOnChanges(changes){
  // console.log('changes container height '+this.containerHeight);
    if (changes) {
        
    }
}



popStateReload(event: any) {

  this.view = this.routeParams.snapshot.queryParams["view"];
  if (this.view !== "form") {
      
  }
} 

tabClick($event) {
  // Implement: Tab navigate function
}

fillSrcArray() {
  
  const parsedToken = this.pluginService.getParsedToken();
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
