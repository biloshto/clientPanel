import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  totalOwed:number;

  constructor(
    public clientService:ClientService
  ) { }

  // when this component initializies we want to fetch the clients through the service, through the getClients(), and because it returns us an observable we need to subsribe to that observable
  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    let total: number = 0;
    // Loop through our clients and add each and every balance to total
    for(let i = 0; i < this.clients.length; i++) {
      // total += parseFloat(this.clients[i].balance); // parseFloat somehow rendered an error for me; the compiler failed to understand the difference between cast operator of the type String to Number, so instead I used the Number object and passed the value to get the appropriate results for it by using Number(variableName)
      total += Number(this.clients[i].balance);
    }
    this.totalOwed = total;
  }

}
