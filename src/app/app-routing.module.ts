import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionComponent } from './layout/public/sesion/sesion.component';
import { IndexComponent } from './layout/app/index/index.component';

const routes: Routes = [{

  path: 'Auth',
  component: SesionComponent,
  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
},
{
  path: 'Home',
  component: IndexComponent,
  loadChildren: () => import('./modules/content/content.module').then(m => m.PrincipalModule)
},
{
  path: '**',
  redirectTo: "Auth/login"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
