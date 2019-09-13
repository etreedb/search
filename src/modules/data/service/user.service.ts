import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { User } from '../schema/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public hasRole(user: User, roleId: string) {
    let hasRole = false;
    user._embedded.role.forEach(role => {
      if (role.roleId === roleId) {
        hasRole = true;
      }
    });

    return hasRole;
  }
}
