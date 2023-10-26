import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  id: any;
  owner: any;
  vehicle: any;
  conductors: any;
  owners: any;
  updateFormVehicle!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _VehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
    this.getVehicleData();
    this.updateFormVehicle = this.createUpdateForm();
  }


  private createUpdateForm(): FormGroup {
    return this._fb.group({
      owner_id: ['', Validators.required],
      num_serie: ['', Validators.required],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
    });
  }


  getVehicleData() {
    this._VehicleService.getVehicle(this.id).subscribe((res: any) => {
      this.owner = res?.owner;
      this.conductors = res?.conductors;
      this.vehicle = res?.vehicle;
      this.owners = res?.owners;

      // Aquí debes parchar los valores al formulario
      this.updateFormVehicle.patchValue({
        owner_id: this.vehicle.owner_id,
        num_serie: this.vehicle.num_serie,
        color: this.vehicle.color,
        brand: this.vehicle.brand,
        type: this.vehicle.type
      });
    });
  }

  public submintFormUpdateVehicle() {
    const vehicleData = this.updateFormVehicle.value;
    vehicleData.id = this.id;

    if (this.updateFormVehicle.valid) {
      this._VehicleService.updateVehicle(vehicleData).subscribe((res: any) => {
        alert(res.message);
        this.getVehicleData();
      });
    }
  }

  detachConductor(conductorId: any) {
    if (confirm("¿Seguro que Desea Desea Desvincular Este Conductor?") == true) {
      this._VehicleService.detachConductor(this.id, conductorId).subscribe((res: any) => {
        this.getVehicleData();
        alert(res.message);
      });
    }
  }

}
