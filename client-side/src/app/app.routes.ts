import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Important for single spa
@Component({
    selector: 'app-empty-route',
    template: '<div>Route is not exist settings.</div>',
})
export class EmptyRouteComponent {}

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule),
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
