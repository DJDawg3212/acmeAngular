import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acmeAngular';

  constructor(private _loginProvider: AuthService) { }

  /**
   * validateAuth
   */
  public validateAuth() {
    console.log("llega")
    return this._loginProvider.enableLogin();
  }

}
