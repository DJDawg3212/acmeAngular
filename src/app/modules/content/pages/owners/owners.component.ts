import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: any;
  public addForm!: FormGroup;
  public itemToDelete: any;
JSON: any;

  constructor(
    private _OwnerService: OwnerService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
    this.getOwnersData();
  }

  private createAddForm(): FormGroup {
    return this._fb.group({
      num_doc: ['', Validators.required],
      type_doc: ['', Validators.required],
      name: ['', Validators.required],
      other_name: [''],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  private resetAddForm(): void {
    this.addForm = this.createAddForm();
  }


  getOwnersData() {
    this._OwnerService.getOwners().subscribe((res: any) => {
      this.owners = res.owners;
    })
  }

  public submitFormAddOwner() {
    if (this.addForm.invalid) {
      Object.values(this.addForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this._OwnerService.insertOwner(this.addForm.value).subscribe((res: any) => {
      this.getOwnersData();
      alert(res.message);
      this.resetAddForm();
    })
  }

  public destroyOwner(_data: any) {
    if (confirm("¿Seguro que Desea Eliminar el Registro?") == true) {
      this._OwnerService.deleteOwner(_data).subscribe((res: any) => {
        this.getOwnersData();
        this.itemToDelete = null;
        alert(res.message);
      });
    }
  }

  public get f(): any {
    return this.addForm.controls;
  }
}
