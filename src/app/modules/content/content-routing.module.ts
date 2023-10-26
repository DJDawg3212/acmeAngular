import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { ConductorsComponent } from './pages/conductors/conductors.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'index',
      component: PrincipalComponent
    },
    {
      path: 'owners',
      component: OwnersComponent
    },
    {
      path: 'owner/:id',
      component: OwnerComponent
    },
    {
      path: 'vehicles',
      component: VehiclesComponent
    },
    {
      path: 'vehicle/:id',
      component: VehicleComponent
    },
    {
      path: 'conductors',
      component: ConductorsComponent
    },
    {
      path: 'conductor/:id',
      component: ConductorComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
