import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean; // so we can show and hide things in the UI depending on if the user is logged in
  loggedInUser:string; // the email of the user
  showRegister:boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessagesService:FlashMessagesService,
    private settingsService:SettingsService
  ) { }

  ngOnInit() {
    // getAuth() returns in the observable an auth object which has the user email, and all that stuff
    this.authService.getAuth().subscribe(auth => {
      // Check to see if user is logged in
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }

      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out.', { cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
