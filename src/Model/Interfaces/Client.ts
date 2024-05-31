export interface Client{
    id : number;
    name : string;
    phone_number : number;
    email : string;
    adresse : string;
    client_photo : string
}

export interface ClientToAdd{
    name : string;
    phone_number : number;
    email : string;
    adresse : string;
    client_photo : string
}