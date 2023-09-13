import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public getRequestHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type','text/plain');
  }


}
