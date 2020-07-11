import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
current
  constructor() { 

  }
  getCurrentUser(){
   this.current= JSON.parse(localStorage.getItem('datos'))
   return this.current;
  }
}
