// clientOrderService.ts
import { toast } from 'react-toastify';
import supabase from '../../Utils/supabase'; // Import Supabase client
import { ClientOrder, ClientOrderToAdd } from '../Interfaces/ClientOrder'; // Define these interfaces based on your client order data structure

// Function to fetch client orders from Supabase
export const fetchClientOrders = async () => {
  const { data: clientOrders, error } = await supabase.from('commande_client').select('*');
  if (error) {
    toast.error(`Error while fetching client orders: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    throw new Error('Failed to fetch client orders');
  }
  return clientOrders;
};

// Function to create a new client order in Supabase
export const createClientOrder = async (newOrderData: ClientOrderToAdd) => {
  const { data, error } = await supabase.from('commande_client').insert([newOrderData]); // Ensure data is an array
  if (error) {
    toast.error(`Error while creating client order: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({error});
    throw new Error('Failed to create client order');
  } else {
    toast.success('Client order created successfully', {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({data});
  }
  return data;
};

// Function to update an existing client order in Supabase
export const updateClientOrder = async (updatedOrderData: ClientOrder) => {
  const { data, error } = await supabase.from('commande_client').update(updatedOrderData).eq('id', updatedOrderData.id);
  if (error) {
    toast.error(`Error while updating client order: ${error.message}`, {
      autoClose: 2000,
      position: 'top-center',
    });
    throw new Error('Failed to update client order');
  } else {
    toast.success('Client order updated successfully', {
      autoClose: 2000,
      position: 'top-center',
    });
  }
  return data;
};

// Function to delete a client order from Supabase
export const deleteClientOrder = async (orderId: number) => {
  const { data, error } = await supabase.from('commande_client').delete().eq('id', orderId);
  if (error) {
    toast.error(`Error while deleting client order: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    throw new Error('Failed to delete client order');
  } else {
    toast.success('Client order successfully deleted', {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({data});
  }
};
