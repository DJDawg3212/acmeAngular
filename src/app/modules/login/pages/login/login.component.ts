import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _loginProvider: AuthService,
    private _routerProvider: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitFormLogin() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this._loginProvider.login(this.myForm.value).subscribe(
      (response) => {
        this._routerProvider.navigateByUrl('Home/index');
      },
      (error) => {
        alert("Usuario o Contraseña Inválidos");
      }
    );
  }

  /**
   * f
   */
  public get f(): any {
    return this.myForm.controls;
  }

}
