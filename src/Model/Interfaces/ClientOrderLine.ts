export interface ClientOrderLine {
    id: number;
    quantite_cmdc: number;
    prix: number ;
    date_cmdc: string ;
    commande_client_id: number ;
    produit_id: number;
}
  
export interface ClientOrderLineToAdd {
    quantite_cmdc: number;
    prix: number ;
    date_cmdc: string ;
    commande_client_id: number ;
    produit_id: number;
}
  
