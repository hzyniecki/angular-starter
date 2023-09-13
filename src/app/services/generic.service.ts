import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { IWeatherRes } from '../models/IWeatherRes.model';
import {GeolocationService} from '@ng-web-apis/geolocation';



@Injectable({
  providedIn: 'root'
})
export class GenericService {


  // Encapsulates data so it can't be manipulated elswhere
  // State Management
  private subject = new BehaviorSubject<IWeatherRes>({} as IWeatherRes);

  weather$: Observable<IWeatherRes> = this.subject.asObservable();


  public apiKey = 'ce309858c9580a2f86ac0e0f45374afb';
  public latitude = 30.2230504;
  public longitude = -97.7795816;
  public weatherRes :any;


  constructor(private http: HttpClient, private authSvc: AuthenticationService, private readonly geolocation$: GeolocationService) {
    // this.loadGenericData();
  }




  public loadWeather() {
    this.getPosition();
    console.log(this.latitude, );
    this.http.get<IWeatherRes>(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`).pipe(
      tap((response) => {
        // Process your response here
        return this.subject.next(response);
      })
    ).subscribe()
  }


  // public loadWeather() {this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`).subscribe(data => {

  //   console.log(data, 'testing');
  //   })
  // }



  public getPosition() {
    this.geolocation$.subscribe(position => {
      console.log(position.coords.latitude, 'position');
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.latitude, this.longitude);
      return;
    }
    );

    }






}
