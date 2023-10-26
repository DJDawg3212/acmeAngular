import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-conductors',
  templateUrl: './conductors.component.html',
  styleUrls: ['./conductors.component.css']
})
export class ConductorsComponent implements OnInit {

  conductors: any;
  public addFormConductor!: FormGroup;

  constructor(
    private _ConductorService: ConductorService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addFormConductor = this.createAddForm();
    this.getConductorsData();
  }

  private createAddForm(): FormGroup {
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

  private resetAddForm(): void {
    this.addFormConductor = this.createAddForm();
  }


  getConductorsData() {
    this._ConductorService.getConductors().subscribe((res: any) => {
      this.conductors = res.conductors;
    })
  }

  public submitFormAddConductor() {
    if (this.addFormConductor.invalid) {
      Object.values(this.addFormConductor.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this._ConductorService.insertConductor(this.addFormConductor.value).subscribe((res: any) => {
      this.getConductorsData();
      alert(res.message)
      this.resetAddForm();
    })
  }

  public destroyConductor(_data: any) {
    if (confirm("¿Seguro que Desea Eliminar el Registro?") == true) {
      this._ConductorService.deleteConductor(_data).subscribe((res: any) => {
        alert(res.message)
        this.getConductorsData();
      })
    }
  }

  public get f(): any {
    return this.addFormConductor.controls;
  }
}
