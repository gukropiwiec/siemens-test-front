import { Component, OnInit } from '@angular/core';
import { IEquipment } from 'src/app/interfaces/equipment.interface';
import { HttpService } from 'src/app/services/http.service';
import { lastValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ModalEqComponent } from '../modal-eq/modal-eq.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    equipments: IEquipment[] = [];
    searchString = '';

    constructor(
      private httpService: HttpService<IEquipment>,
      private modalService: ModalService,
      private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
      this.getEquipment();
    }

    async getEquipment() {
      const equipments$ = this.httpService.get('equipment');
      const eqPromise = await lastValueFrom<IEquipment[]>(equipments$);
      this.equipments = eqPromise;
    }

    openModal(equipment?: IEquipment): void {
      let modalWidth = '90vw';
      if (window.innerWidth > 768) modalWidth = '600px';
      const dialogRef = this.modalService.openModal(ModalEqComponent, {
        width: modalWidth,
        data: { title: `${equipment ? 'Edit' : 'Create'} Equipment`, equipment }, 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) this.getEquipment();
      });
    }

    deleteEquipment(_id: any) {
      this.httpService.delete('equipment', _id).subscribe(async () => {
        await this.getEquipment();
        this.snackBar.open('Equipment deleted successfully!', 'OK');
      });
    }

    async searchBySN() {
      if (this.searchString) {
        const res = this.httpService.getOne('equipment', this.searchString);
        const eq = await lastValueFrom(res);
        eq ? this.openModal(eq) : this.snackBar.open('Equipment not found!', 'OK');
      }
    }
}
