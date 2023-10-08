import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { IEquipment } from 'src/app/interfaces/equipment.interface';
import { Observable, lastValueFrom } from 'rxjs';
import { IPoint } from 'src/app/interfaces/point.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-eq',
  templateUrl: './modal-eq.component.html',
  styleUrls: ['./modal-eq.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    CommonModule, 
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalEqComponent implements AfterViewInit {
  equipmentForm = this.fb.group({
    name: ['', Validators.required],
    serialNumber: ['', Validators.required]
  });
  points: IPoint[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEqComponent>,
    private fb: FormBuilder,
    private httpService: HttpService<IEquipment>,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    if (this.data.equipment) {
      this.equipmentForm.patchValue(this.data.equipment);
      this.points = this.data.equipment.points;

      setTimeout(() => {
        for (let i = 0; i < this.points.length; i++) {
          (document.getElementById(`floatingInputNamePoint${i}`) as HTMLInputElement).value = this.points[i].name;
          (document.getElementById(`floatingInputDataTypePoint${i}`) as HTMLInputElement).value = this.points[i].dataType;
          (document.getElementById(`floatingInputValuePoint${i}`) as HTMLInputElement).value = this.points[i].value;
        }
      });
    }
  }

  closeModal(data?: any) {
    this.dialogRef.close(data);
  }
  
  addPointToList() {
    this.points.push({ name: '', dataType: '', value: '' });
  }
  
  async post() {
    const _points: IPoint[] = [];

    for (let i = 0; i < this.points.length; i++) {
      const _point: IPoint = {
        name: (document.getElementById(`floatingInputNamePoint${i}`) as HTMLInputElement).value,
        dataType: (document.getElementById(`floatingInputDataTypePoint${i}`) as HTMLInputElement).value,
        value: (document.getElementById(`floatingInputValuePoint${i}`) as HTMLInputElement).value,
      }
      if (_point.name !== '' || _point.dataType !== '' || _point.value !== '') {
        _points.push(_point);
      }
    } 

    const payload = {
      points: _points,
      ...this.equipmentForm.value,
    }

    let result: Observable<IEquipment>; 

    if (this.data.equipment) {
      result = this.httpService.patch('equipment', payload as unknown as IEquipment, this.data.equipment._id);
    } else {
      result = this.httpService.post('equipment', payload as unknown as IEquipment);
    }

    const resPromise = await lastValueFrom(result);
    this.snackBar.open(`Equipment ${this.data.equipment ? 'edited' : 'created' } successfully!`, 'OK');
    this.closeModal(resPromise);
  }
}
