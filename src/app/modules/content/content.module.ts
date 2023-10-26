import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ConductorsComponent } from './pages/conductors/conductors.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [PrincipalComponent, OwnersComponent, OwnerComponent, VehiclesComponent, VehicleComponent, ConductorsComponent, ConductorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentRoutingModule,
    ModalModule.forRoot()
  ]
})
export class PrincipalModule { }
