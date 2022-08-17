
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddonComponent } from './addon.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { AddonService } from './addon.service';

@NgModule({
    declarations: [
        AddonComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
      ],
    exports: [AddonComponent],
    providers: [
        AddonService
    ]
})
export class AddonModule { }
