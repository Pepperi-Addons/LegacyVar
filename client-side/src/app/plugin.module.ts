
import { NgModule  } from '@angular/core';
import { PluginComponent } from './plugin.component';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatTabsModule , MatDialogModule, MatSelectModule} from '@angular/material';
// import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { BrowserModule } from '@angular/platform-browser';
//@ts-ignore
import {AddonService} from 'pepperi-addon-service';



@NgModule({
  declarations: [
    PluginComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicModule.withComponents([]),
    BrowserModule
    ],
  exports: [

  ],
  providers: [{
    provide: 'plugins',
    useValue: [{
      name: 'plugin-component',
      component: PluginComponent
    }],
    multi: true
  },
  {
    provide: 'webapp',
    useValue: [{
      name: 'plugin-component',
      component: PluginComponent
    }],
    multi: true
  }],
  bootstrap: [/*PluginComponent*/
            ],
  entryComponents: [
    PluginComponent
                    ]
})
export class PluginModule { }
