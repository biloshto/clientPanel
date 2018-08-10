import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router'; // ActivatedRoute has to do with getting the id parameter
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    // Get ID from the URL
    this.id = this.route.snapshot.params['id'];

    // Get client from service
    this.clientService.getClient(this.id).subscribe(client => {
      if(client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  updateBalance(id:string) {
    // Update client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated.', { cssClass: 'alert-success', timeout: 4000 });
    // navigate back to that particular client
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick() {
    if(confirm("Are you sure you want to delete?")) {
      // every interaction we have with the clients is going to go through our service
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted.', { cssClass: 'alert-success', timeout: 4000 });
    // navigate back to that particular client
    this.router.navigate(['/']);
    }
  }

}
