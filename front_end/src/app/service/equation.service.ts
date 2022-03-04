import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Equation} from "../equation";
import {environment} from "../../environments/environment";
// potentially have to import environment.prod when ng build

@Injectable({
  providedIn: 'root'
})
export class EquationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEquation(): Observable<Equation> {
    return this.http.get<Equation>(`${this.apiUrl}`);
  }

  postEquation(equation: Equation): Observable<Equation> {
    return this.http.post<Equation>(`${this.apiUrl}`, equation);
  }
}
