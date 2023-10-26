import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  id: any;
  owner: any;
  vehicles: any;
  updateFormOwner!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _OwnerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
    this.getOwnerData();
    this.updateFormOwner = this.createUpdateFormOwner();
  }


  private createUpdateFormOwner(): FormGroup {
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


  getOwnerData() {
    this._OwnerService.getOwner(this.id).subscribe((res: { owner: any; vehicles: any; }) => {
      this.owner = res.owner;
      this.vehicles = res.vehicles;
      this.updateFormOwner.patchValue({
        num_doc: this.owner.num_doc,
        type_doc: this.owner.type_doc,
        name: this.owner.name,
        other_name: this.owner.other_name,
        last_name: this.owner.last_name,
        phone: this.owner.phone,
        email: this.owner.email,
        address: this.owner.address,
        city: this.owner.city,
      });

    })
  }

  public submintFormUpdateOwner() {
    const ownerData = this.updateFormOwner.value;
    ownerData.id = this.id;
    this._OwnerService.updateOwner(ownerData).subscribe((res: any) => {
      alert(res.message);
      this.getOwnerData();
    });

  }

}
