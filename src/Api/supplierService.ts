import { toast } from 'react-toastify';
import  supabase  from '../Utils/supabase'; // Import Supabase client
import { Supplier, SupplierToAdd } from '../Interfaces/Suppliers';


// Function to fetch suppliers from Supabase
export const fetchSuppliers = async () => {
  const { data : Suppliers, error } = await supabase.from('Suppliers').select('*');
  if (error) {
    toast.error(`Error while fetching suppliers:' ${error.message}`,
    { autoClose:1000 , 
      position:'top-center',
    }
    );
    throw new Error('Failed to fetch suppliers');
  }
  return Suppliers;
};

// Function to create a new supplier in Supabase
export const createSupplier = async (newSupplierData: SupplierToAdd) => {
  const { data, error } = await supabase.from('Suppliers').insert(newSupplierData);
  if (error) {
    toast.error(`Error while creating supplier:', ${error.message}`,
    {   autoClose:1000 , 
      position:'top-center',
    });
    console.log({error});
    throw new Error('Failed to create supplier');
  }
  else {
    toast.success(`Supplier created successfully `, 
    {   autoClose:1000 , 
      position:'top-center',
    });
    console.log({data});
  }
  return data;
};

// Function to update an existing supplier in Supabase
export const updateSupplier = async (updatedSupplierData: Supplier) => {
  const { data, error } = await supabase.from('Suppliers').update(updatedSupplierData).eq('id', updatedSupplierData.id);
  if (error) {
    toast.error(`Error while updating supplier:', ${error.message}`,
    {   autoClose:2000 , 
      position:'top-center',
    });
    throw new Error('Failed to update supplier');
  }
  else{
    toast.success(`Supplier updated successfully `, 
    {   autoClose:2000 , 
      position:'top-center',
    });
  }
  return data;
};

// Function to delete a supplier from Supabase
export const deleteSupplier = async (supplierId: number) => {
  const { error , data} = await supabase.from('Suppliers').delete().eq('id', supplierId);
  if (error) {
    toast.error(`Error while deleting supplier:', ${error.message}`,
    {   autoClose:1000 , 
      position:'top-center',
    });
    throw new Error('Failed to delete supplier');
  }
  else{
    toast.success(`Supplier successfully deleted`, 
    {   autoClose:1000 , 
      position:'top-center',
    });
    console.log({data});
  }
};