import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnAdd:boolean = false; // we want it to be disabled by default

  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public clientService:ClientService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  // if not valid we want to implement a module called Angular 2 Flash Messages, it'll allow us to do a redirect whether it's to the same page, or a different page, and then it'll just put a message in memory, it allows us to add a message to that redirect and then display it; when we submit this and it's not valid we want it to just reddirect us to the same form, to the same page, and show us a message saying "The form is not valid", and we're going to use this throughout the application, even on success messages, like when we login correctly we want it to say "You are now loged in." and things like that. https://github.com/moff/angular2-flash-messages

  onSubmit({value, valid}:{value:Client, valid:boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if(!valid) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['add-client']);
    } else {
      // Add new client
      this.clientService.newClient(value); // value is the object we want to submit
      this.flashMessagesService.show('New client added.', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
