import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingsForm: FormGroup;
  constructor(private fb: FormBuilder) {
    localStorage.setItem('login-page', 'false');
    this.createForm();
   }
   createForm() {
    this.settingsForm = this.fb.group({
       appName: ['', Validators.required ],
       algomojoApiKey: ['', Validators.required ],
       algomojoApiSecret: ['', Validators.required ],
       account: ['', Validators.required ],
       capital: ['', Validators.required ],
       firstBuyConstant: ['', Validators.required ],
       reBuyConstant: ['', Validators.required ],
       reBuyCusionConstant: ['', Validators.required ],
       tradingType: ['', Validators.required ],
       trailingSLConstant: ['', Validators.required ],
       zerodhaAccessToken: ['', Validators.required ],
       zerodhaApiKey: ['', Validators.required ],
       zerodhaApiSecret: ['', Validators.required ],
       zerodhaRequestToken: ['', Validators.required ],
       expiryDate: ['', Validators.required ]
    });
  }
  ngOnInit() {
  }
  onSave() {
    console.log('form data is ', this.settingsForm.value);
  }

}
