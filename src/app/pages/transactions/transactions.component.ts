import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  name: string = "";
  email: string = "";
  job: string = "";
  address: string = "";
  selectedSource: string = "email";
  selectedGender: string = "male";
  isCompany : boolean = false;
  createdAt = new FormControl(new Date());
  
  tiles: any[] = [
    {text: 'One', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'}
  ];
  constructor() {
    localStorage.setItem('login-page', 'false');
   }
  public createCustomer(){

  }
  ngOnInit() {
  }

}
