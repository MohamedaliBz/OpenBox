import { toast } from 'react-toastify';
import  supabase  from '../Utils/supabase'; // Import Supabase client
import { Product, ProductToAdd } from '../Interfaces/Products';


// Function to fetch products from Supabase
export const fetchProducts = async () => {
  const { data , error } = await supabase.from('Products').select('id,name, buying_price, quantity, threshold_value, category, expiry_date, availability');
  if (error) {
    toast.error(`Error while fetching data:', ${error.message}`,
    {   autoClose:2000 , 
      position:'top-center',
    });
    throw new Error('Failed to fetch products');
  }
  return data;
};

// Function to create a new product in Supabase
export const createProduct = async (newProductData: ProductToAdd) => {
  const { data, error } = await supabase.from('Products').insert(newProductData);
  if (error) {
    toast.error(`Error while creating product:', ${error.message}`,
    {   autoClose:3000 , 
      position:'top-center',
    });
    console.log({error});
    throw new Error('Failed to create product');
  }
  else {
    toast.success(`Product created successfully `, 
    {   autoClose:2000 , 
      position:'top-center',
    });
    console.log({data});
  }
  return data;
};

// Function to update an existing product in Supabase
export const updateProduct = async (updatedProductData: Product) => {
  const { data, error } = await supabase.from('Products').update(updatedProductData).eq('id', updatedProductData.id);
  if (error) {
    toast.error(`Error while updating product:', ${error.message}`,
    {   autoClose:2000 , 
      position:'top-center',
    });
    throw new Error('Failed to update product');
  }
  else{
    toast.success(`Product updated successfully `, 
    {   autoClose:2000 , 
      position:'top-center',
    });
  }
  return data;
};

// Function to delete a product from Supabase
export const deleteProduct = async (productId: any) => {
  const { error , data} = await supabase.from('Products').delete().eq('id', productId);
  if (error) {
    toast.error(`Error while deleting product:', ${error.message}`,
    {   autoClose:2000 , 
      position:'top-center',
    });
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
  else{
    toast.success(`Product successfully deleted`, 
    {   autoClose:2000 , 
      position:'top-center',
    });
    console.log({data});
  }
};