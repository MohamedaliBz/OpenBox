export interface Product {
    id : Number ;
    name: string;
    buying_price: number;
    quantity: number;
    threshold_value: number;
    category: string;
    expiry_date: string;
    availability: string;
  }

export interface ProductToAdd{
  name: string;
  category: string;
  buying_price: number;
  quantity: number;
  unit: string,
  expiry_date: string;
  threshold_value: number;
}
