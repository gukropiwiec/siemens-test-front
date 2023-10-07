import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';

const moduleComponents: (Type<any>)[] = [
    HomeComponent
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule
    ],
    declarations: moduleComponents,
    exports: moduleComponents,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}
