import supabase from '../../Utils/supabase';
import { ClientOrderLine, ClientOrderLineToAdd } from '../Interfaces/ClientOrderLine';

export const fetchClientOrderLines = async (commandeClientId: number) => {
    const { data, error } = await supabase
        .from('ligne_commande_client')
        .select('*')
        .eq('commande_client_id', commandeClientId);

    if (error) throw new Error(error.message);
    return data;
};

export const createClientOrderLine = async (lineData : ClientOrderLineToAdd) => {
    const { data, error } = await supabase.from('ligne_commande_client').insert([lineData]);
    if (error) throw new Error(error.message);
    return data;
};

export const updateClientOrderLine = async (lineData : ClientOrderLine) => {
    const { data, error } = await supabase.from('ligne_commande_client').update(lineData).eq('id', lineData.id);
    if (error) throw new Error(error.message);
    return data;
};

export const deleteClientOrderLine = async (lineId : number) => {
    const { data, error } = await supabase.from('ligne_commande_client').delete().eq('id', lineId);
    if (error) throw new Error(error.message);
    return data;
};
