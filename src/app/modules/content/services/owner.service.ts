import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private _baseUrl = "http://acmelaravel.test/api";

  constructor(private HttpClient: HttpClient) { }

  insertOwner(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/add-owner`, _data)
  }

  getOwners() {
    return this.HttpClient.get(`${this._baseUrl}/owners`)
  }

  getOwner(_id: any) {
    return this.HttpClient.get(`${this._baseUrl}/owner/${_id}`)
  }

  updateOwner(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/update-owner`, _data)
  }

  deleteOwner(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/delete-owner`, _data);
  }
}
