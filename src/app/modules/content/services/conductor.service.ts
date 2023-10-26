import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private _baseUrl = "http://acmelaravel.test/api";

  constructor(private HttpClient: HttpClient) { }

  insertConductor(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/add-conductor`, _data)
  }

  getConductors() {
    return this.HttpClient.get(`${this._baseUrl}/conductors`)
  }

  getConductor(_id: any) {
    return this.HttpClient.get(`${this._baseUrl}/conductor/${_id}`)
  }

  updateConductor(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/update-conductor`, _data)
  }

  deleteConductor(_data: any) {
    return this.HttpClient.post(`${this._baseUrl}/delete-conductor`, _data);
  }

  detachVehicle(vehicle: any, conductor: any) {
    let data = {
      vehicle_id: vehicle,
      conductor_id: conductor
    }
    return this.HttpClient.post(`${this._baseUrl}/detach-conductor`, data);
  }

  attachVehicle(vehicle: any, conductor: any) {
    let data = {
      vehicle_id: vehicle,
      conductor_id: conductor
    }
    return this.HttpClient.post(`${this._baseUrl}/attach-vehicle`, data);
  }
}
