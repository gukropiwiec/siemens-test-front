import { Component, OnInit } from '@angular/core';
import { IEquipment } from 'src/app/interfaces/equipment.interface';
import { HttpService } from 'src/app/services/http.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    equipments: IEquipment[] = [];

    constructor(private httpService: HttpService<IEquipment>) {}

    ngOnInit(): void {
      this.getEquipment();
    }

    async getEquipment() {
      const equipments$ = this.httpService.get('equipment');
      const eqPromise = await lastValueFrom<IEquipment[]>(equipments$);
      this.equipments = eqPromise;
    }
}
