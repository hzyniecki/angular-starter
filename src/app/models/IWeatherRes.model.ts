import { IMain } from "./IMain.model";
import { IWeather } from "./IWeather.model";

export interface IWeatherRes {
  name: string;
  main:IMain;
  weather:IWeather[];
}

