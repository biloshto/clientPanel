import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';

// when we fetch the clients from the firebase we want it to return them as a special type of observable: list for all the clients, and object for one client

@Injectable()
export class ClientService {
  clients: FirebaseListObservable<any[]>; // <type>
  client: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase // we need to inject as dependency in the constructor
  ) {
    this.clients = this.af.list('/clients/clients') as FirebaseListObservable<Client[]>; // fetch our clients from database (/clients/clients is our collection in firebase)
  }

  getClients() {
    return this.clients;
  }

  newClient(client:Client) {
    this.clients.push(client);
  }

  getClient(id:string) {
    this.client = this.af.object('/clients/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client;
  }

  updateClient(id:string, client:Client) {
    return this.clients.update(id, client);
  }

  deleteClient(id:string) {
    return this.clients.remove(id);
  }

}
