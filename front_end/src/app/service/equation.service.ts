import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Equation} from "../equation";

@Injectable({
  providedIn: 'root'
})
export class EquationService {

  constructor(private http: HttpClient) {}

  getEquation(): Observable<Equation[]> {
    return this.http.get<Equation[]>('http://127.0.0.1:5000/equation');
  }
}
