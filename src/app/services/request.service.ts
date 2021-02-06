import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { PhoneModel } from '../models/phone.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private endPoint = environment.endpoint;

  constructor(private http: HttpClient) { }

  sendPhoneNumber(phone: PhoneModel) {
    return this.http.post(`${ this.endPoint }/phones.json`, phone)
    .pipe(
      map( (resp: any) => {
        phone.pin = resp.name;
        return phone;
      })
    );
  }

  getPin(pin: number) {
    return this.http.get(`${ this.endPoint }/phones/${pin}.json`);
  }

  getTemplate(page: string) {
    return this.http.get('assets/templates/' + page + '.html', { responseType: 'text' });
  }

  getJson(file){
    return this.http.get('assets/data/' + file + '.json', { responseType: 'json' });

  }
}
