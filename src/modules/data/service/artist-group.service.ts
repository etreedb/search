import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistGroupService {

  constructor(
    private http: HttpClient
  ) { }
}
