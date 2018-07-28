import './vendor.ts';

import {NgModule, Injector, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { RenewappSharedModule } from 'app/shared';
import { RenewappCoreModule } from 'app/core';
import { RenewappAppRoutingModule } from './app-routing.module';
import { RenewappHomeModule } from 'app/home';
import { RenewappAccountModule } from './account/account.module';
import { RenewappEntityModule } from './entities/entity.module';
import {MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RenewappAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        RenewappSharedModule,
        RenewappCoreModule,
        RenewappHomeModule,
        RenewappAccountModule,
        RenewappEntityModule,
        MDBBootstrapModulesPro.forRoot(),
        ToastModule.forRoot(),
        WavesModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
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
        MDBSpinningPreloader,
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [JhiMainComponent]
})
export class RenewappAppModule {}
