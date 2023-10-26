import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private _baseUrl = "http://acmelaravel.test/api";

  constructor(private HttpClient: HttpClient) { }

  insertVehicle(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/add-vehicle`, _data)
  }

  getVehicles() {
    return this.HttpClient.get(`${this._baseUrl}/vehicles`)
  }

  getVehicle(_id: any) {
    return this.HttpClient.get(`${this._baseUrl}/vehicle/${_id}`)
  }

  updateVehicle(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/update-vehicle`, _data)
  }

  deleteVehicle(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/delete-vehicle`, _data);
  }
  detachConductor(vehicle: any, conductor: any) {
    let data = {
      vehicle_id: vehicle,
      conductor_id: conductor
    }
    return this.HttpClient.post(`${this._baseUrl}/detach-conductor`, data);
  }
}
