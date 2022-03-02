import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ErrorComponent } from '../../error.component';
import { Router } from '@angular/router';
import { apiConfig } from './../../utils/config';
import { ZerodhaService } from '../../services/zerodha/zerodha.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;

  //public errorDialogRef: MatDialogRef<ErrorComponent>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zerodhaService: ZerodhaService
  ) {
    localStorage.setItem('login-page', 'true');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params) {
        const zerodhaRequestToken = params.request_token;
        if (!zerodhaRequestToken) {
          window.open(
            `https://kite.zerodha.com/connect/login?api_key=${apiConfig.apiKey}&v=3`,
            '_self'
          );
        } else {
          debugger;
          this.zerodhaService
            .login(zerodhaRequestToken)
            .then((zerodhaResponse: any) => {
              console.log(zerodhaResponse);
              const accessToken = zerodhaResponse.accessToken;
              if (accessToken) {
                this.zerodhaService.loadInstruments().then((instruments: any) => {
                  console.log(instruments);
                });
              }
            });
        }
      }
    });
  }
  login() {
    if (this.username === 'demo' && this.password === 'demo') {
      this.router.navigate(['customer-list']);
    } else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: 'Your login information are incorrect!',
        },
      });
    }
  }
}
