import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getFestivos(){
    return this.http.get(`${this.API_URL}/festivo/listar/2023`);
  }

  fechaFestivos(anio: any, mes: any, dia: any): Observable<string>{
    return this.http.get<string>(`${this.API_URL}/festivo/validar/${anio}/${mes}/${dia}`);
  }

  consultarAnio(anio: any){
    return this.http.get(`${this.API_URL}/festivo/listar/${anio}`);

  }

}
