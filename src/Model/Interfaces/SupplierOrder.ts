export interface SupplierOrder{
    id : number;
    nom_commande : string;
    date_commande : Date;
    etat_commande : string;
    client_id : number;
}

export interface SupplierOrderToAdd{
    nom_commande : string;
    date_commande : Date;
    etat_commande : string;
    client_id : number;
}