export interface Supplier {
    id : number ;
    name: string;
    contact_number : number;
    email : string;
    adresse : string ;
    photo : string;
}

export interface SupplierToAdd {
    photo : string;
    name: string;
    contact_number : number;
    email : string;
    adresse : string ;
}