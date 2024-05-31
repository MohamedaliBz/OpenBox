// clientService.ts
import { toast } from 'react-toastify';
import supabase from '../../Utils/supabase'; // Import Supabase client
import { Client, ClientToAdd } from '../Interfaces/Client'; // Define these interfaces based on your client data structure

// Function to fetch clients from Supabase
export const fetchClients = async () => {
  const { data: clients, error } = await supabase.from('client').select('*');
  if (error) {
    toast.error(`Error while fetching clients: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    throw new Error('Failed to fetch clients');
  }
  return clients;
};

// Function to create a new client in Supabase
export const createClient = async (newClientData: ClientToAdd) => {
  const { data, error } = await supabase.from('client').insert([newClientData]); // Ensure data is an array
  if (error) {
    toast.error(`Error while creating client: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({error});
    throw new Error('Failed to create client');
  } else {
    toast.success('Client created successfully', {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({data});
  }
  return data;
};

// Function to update an existing client in Supabase
export const updateClient = async (updatedClientData: Client) => {
  const { data, error } = await supabase.from('client').update(updatedClientData).eq('id', updatedClientData.id);
  if (error) {
    toast.error(`Error while updating client: ${error.message}`, {
      autoClose: 2000,
      position: 'top-center',
    });
    throw new Error('Failed to update client');
  } else {
    toast.success('Client updated successfully', {
      autoClose: 2000,
      position: 'top-center',
    });
  }
  return data;
};

// Function to delete a client from Supabase
export const deleteClient = async (clientId: number) => {
  const { data, error } = await supabase.from('client').delete().eq('id', clientId);
  if (error) {
    toast.error(`Error while deleting client: ${error.message}`, {
      autoClose: 1000,
      position: 'top-center',
    });
    throw new Error('Failed to delete client');
  } else {
    toast.success('Client successfully deleted', {
      autoClose: 1000,
      position: 'top-center',
    });
    console.log({data});
  }
};
