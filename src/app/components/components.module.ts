import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment/equipment.component';
import { TableComponent } from './table/table.component';
import { ModalEqComponent } from './modal-eq/modal-eq.component';

const moduleComponents: (Type<any>)[] = [
    EquipmentComponent,
    TableComponent,
    ModalEqComponent
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: moduleComponents,
    exports: moduleComponents,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
