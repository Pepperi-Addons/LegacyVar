
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddonComponent } from './addon.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { AddonService } from './addon.service';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        AddonComponent,
        SafePipe
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
