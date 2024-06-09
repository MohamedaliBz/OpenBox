export interface ClientOrder{
    id : number;
    nom_commande : string;
    date_commande : string;
    etat_commande : string;
    client_id : number;
}

export interface ClientOrderToAdd{
    nom_commande : string;
    date_commande : string;
    etat_commande : string;
    client_id : number;
}
