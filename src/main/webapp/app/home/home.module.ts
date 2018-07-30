import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { CarouselModule, WavesModule } from 'ng-uikit-pro-standard';

@NgModule({
    imports: [DemoSharedModule, RouterModule.forChild([HOME_ROUTE]), CarouselModule, WavesModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHomeModule {}
