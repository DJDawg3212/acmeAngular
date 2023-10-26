import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: boolean = false;
  private _baseUrl = 'http://acmeLaravel.test/api';

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/login`, data);
  }

  /**
   * enableLogin
  */
  public enableLogin() {
    return this._auth;
  }
}
