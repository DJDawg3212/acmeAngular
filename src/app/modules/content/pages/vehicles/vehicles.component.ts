import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicles: any;
  owners: any;
  public addFormVehicle!: FormGroup;
  public itemToDelete: any;

  constructor(
    private _VehicleService: VehicleService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addFormVehicle = this.createAddForm();
    this.getVehiclesData();
  }

  private createAddForm(): FormGroup {
    return this._fb.group({
      owner_id: ['', Validators.required],
      num_serie: ['', Validators.required],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  private resetAddForm(): void {
    this.addFormVehicle = this.createAddForm();
  }


  getVehiclesData() {
    this._VehicleService.getVehicles().subscribe((res: any) => {
      this.vehicles = res.vehicles;
      this.owners = res.owners;
    })
  }

  public submitFormAddVehicle() {
    if (this.addFormVehicle.invalid) {
      Object.values(this.addFormVehicle.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this._VehicleService.insertVehicle(this.addFormVehicle.value).subscribe((res: any) => {
      this.getVehiclesData();
      alert(res.message);
      this.resetAddForm();
    })
  }

  public destroyVehicle(_data: any) {
    if (confirm("¿Seguro que Desea Eliminar el Registro?") == true) {
      this._VehicleService.deleteVehicle(_data).subscribe((res: any) => {
        this.getVehiclesData();
        this.itemToDelete = null;
        alert(res.message);
      });
    }
  }

  public get f(): any {
    return this.addFormVehicle.controls;
  }
}
