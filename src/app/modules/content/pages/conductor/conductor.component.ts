import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  id: any;
  conductor: any;
  vehicles: any;
  vehiclesAll: any;
  updateFormConductor!: FormGroup;
  formAttachVehicle!: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _ConductorService: ConductorService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
    this.getConductorData();
    this.updateFormConductor = this.createUpdateForm();
    this.formAttachVehicle = this.createAttachVehicleForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  private createUpdateForm(): FormGroup {
    return this._fb.group({
      num_doc: ['', Validators.required],
      type_doc: ['', Validators.required],
      name: ['', Validators.required],
      other_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  private createAttachVehicleForm(): FormGroup {
    return this._fb.group({
      vehicle_id: ['', Validators.required],
    });
  }

  getConductorData() {
    this._ConductorService.getConductor(this.id).subscribe((res: { conductor: any; vehicles: any; notRelatedVehicles: any; }) => {
      this.conductor = res.conductor;
      this.vehicles = res.vehicles;
      this.vehiclesAll = res.notRelatedVehicles;
      this.updateFormConductor.patchValue({
        num_doc: this.conductor.num_doc,
        type_doc: this.conductor.type_doc,
        name: this.conductor.name,
        other_name: this.conductor.other_name,
        last_name: this.conductor.last_name,
        phone: this.conductor.phone,
        email: this.conductor.email,
        address: this.conductor.address,
        city: this.conductor.city,
      });
    })
  }

  public submintFormUpdateConductor() {
    const conductorData = this.updateFormConductor.value;
    conductorData.id = this.id;

    this._ConductorService.updateConductor(conductorData).subscribe((res: any) => {
      alert(res.message)
      this.getConductorData();
    });
  }

  detachVehicle(vehicleId: any) {
    if (confirm("¿Seguro que Desea Desvincular Este Vehiculo?") == true) {
      this._ConductorService.detachVehicle(vehicleId, this.id).subscribe((res: any) => {
        this.getConductorData();
        alert(res.message);
      });
    }
  }

  attachVehicle() {
    this._ConductorService.attachVehicle(this.formAttachVehicle.value.vehicle_id, this.id).subscribe((res: any) => {
      this.closeModal()
      alert(res.message);
      this.getConductorData();
    });
  }
}
