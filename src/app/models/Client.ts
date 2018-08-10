// this is what our /clients collection in firebase has

export interface Client{
  // we want them to be optional so we don't get any strange errrors, and we do that with a question mark
  $key?:string; // firebase has a key for each entry, which is kind of like a unique id
  firstName?:string;
  lastName?:string;
  email?:string;
  phone?:string;
  balance?:number;
}