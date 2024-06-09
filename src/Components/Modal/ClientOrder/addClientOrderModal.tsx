import React, { useState} from 'react';
import { Modal ,Input , Button, Select, DatePicker, InputNumber} from 'antd';
import { useAuth } from '../../../Context/AuthProvider';
import { useMutation, useQueryClient } from 'react-query';
import { createClientOrder } from '../../../Model/Services/ClientOrder';
import { Moment} from 'moment';

interface AddClientOrderModalProps {
  open: boolean;
  onClose: () => void;
}
const { Option } = Select;

const AddClientOrderModal: React.FC<AddClientOrderModalProps> = ({ open, onClose }) => {

  const queryClient = useQueryClient();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clientOrder, setClientOrder] = useState({
    nom_commande: '',
    date_commande: '',
    etat_commande: '',
    client_id: 0,
  });

  const resetForm = () => {
    setClientOrder({
      nom_commande: '',
      date_commande: '',
      etat_commande: '',
      client_id: 0 ,
    })
  };
  
  const { mutate: addClientOrder } = useMutation(createClientOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('clientOrders');
      resetForm();   // Reset the form after successful addition
      onClose();
      setConfirmLoading(false);
    },
    onError: () => {
      setConfirmLoading(false);
    },
  });

  const handleCancel = () => {
    console.log('Clicked cancel button');
    resetForm();
    onClose();
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientOrder({ ...clientOrder, [name]: value });
  };
  const handleInputNumberChange = async (id: any ) => {
    setClientOrder(prevState => ({
      ...prevState,
      client_id: id
    }))
  };
  const handleSelectChange = (value: string, name: string) => {
    setClientOrder({ ...clientOrder, [name]: value });
  };
  const handleDateChange = (date: Moment) => {
    setClientOrder({ ...clientOrder, date_commande: date.format('YYYY-MM-DD') });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    addClientOrder(clientOrder);
  };


  return (
    <Modal
      className='custom-modal'
      title="New Client Order"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Discard
        </Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
          Add Client Order
        </Button>
      ]}
    >
      <Input placeholder="Enter client Order Name" name="nom_commande" onChange={handleInputChange} />
      <Select
      placeholder="Enter Order Status"
      onChange={(value) => handleSelectChange(value, 'etat_commande')}
      style={{ width: '100%'}}
    >
      <Option value="Pending">Pending</Option>
      <Option value="Processing">Processing</Option>
      <Option value="Shipped">Shipped</Option>
    </Select>

      <DatePicker name='date_commande' placeholder="Enter order's date" onChange={handleDateChange} />
      <InputNumber 
        placeholder="Enter the owner's order ID" 
        name="client_id" 
        style={{ width: '100%' }}
        onChange={handleInputNumberChange} />
    </Modal>
  );
};
export default AddClientOrderModal;
