import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment/equipment.component';
import { TableComponent } from './table/table.component';
import { ModalEqComponent } from './modal-eq/modal-eq.component';
import { FormsModule } from '@angular/forms';

const moduleComponents: (Type<any>)[] = [
    EquipmentComponent,
    TableComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: moduleComponents,
    exports: moduleComponents,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
