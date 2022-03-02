import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  name: string = "";
  email: string = "";
  job: string = "";
  address: string = "";
  selectedSource: string = "email";
  selectedGender: string = "male";
  isCompany : boolean = false;
  createdAt = new FormControl(new Date());

  name1: string = "";
  email1: string = "";
  job1: string = "";
  address1: string = "";
  selectedSource1: string = "email";
  selectedGender1: string = "male";
  isCompany1 : boolean = false;
  createdAt1 = new FormControl(new Date());
  tiles: any[] = [
    {text: 'One', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
    {text: 'Five', color: 'lightblue'},
    {text: 'Six', color: 'lightgreen'},
    {text: 'Seven', color: 'lightpink'},
  ];
  constructor() {
    localStorage.setItem('login-page', 'false');
   }
  public createCustomer(){

  }
  ngOnInit() {
  }

}
