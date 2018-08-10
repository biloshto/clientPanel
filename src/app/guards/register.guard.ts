import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private router:Router,
    public settingsService:SettingsService
  ) { }

  // if allowRegistration is true then the user can go to the Register page, if not - if it's false then the site will navigate to the login page
  canActivate(): boolean{
    if(this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}