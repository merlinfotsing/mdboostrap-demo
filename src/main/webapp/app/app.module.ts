import './vendor.ts';

import { NgModule, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { DemoSharedModule } from 'app/shared';
import { DemoCoreModule } from 'app/core';
import { DemoAppRoutingModule } from './app-routing.module';
import { DemoHomeModule } from 'app/home';
import { DemoAccountModule } from './account/account.module';
import { DemoEntityModule } from './entities/entity.module';
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        DemoAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        DemoSharedModule,
        DemoCoreModule,
        DemoHomeModule,
        DemoAccountModule,
        DemoEntityModule,
        MDBBootstrapModulesPro.forRoot()
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        },
        MDBSpinningPreloader
    ],
    bootstrap: [JhiMainComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DemoAppModule {}
