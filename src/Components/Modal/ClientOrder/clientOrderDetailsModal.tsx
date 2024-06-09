import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, Descriptions, Space, Button, Input, Avatar, Upload, message } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { ClientOrder } from '../../../Model/Interfaces/ClientOrder';
import { updateClientOrder } from '../../../Model/Services/ClientOrder';
import { Moment } from 'moment';


type OrderDetailsModalProps = {
    ClientOrder: ClientOrder;
    open: boolean;
    onClose: () => void;
};

export const ClientOrderDetails: React.FC<OrderDetailsModalProps> = ({ ClientOrder, open, onClose }) => {

    const queryClient = useQueryClient();
    // Use useMutation to update a supplier
    const { mutate: UpdateOrder } = useMutation(updateClientOrder, {
        onSuccess: () => {
            // Invalidate the 'suppliers' query to refetch the data
            queryClient.invalidateQueries('clientOrders');
            // Close the modal after successful update
            setIsEditing(!isEditing);
            onClose();
        },
        onError() {
            toast.error('Error while updating client order')
        }
  })
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrder, setEditedOrder] = useState({...ClientOrder});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedOrder({ ...editedOrder, [name]: value });
    };

    const handleEditClick = () => {
        console.log("Edit mode activated");
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        UpdateOrder(editedOrder)
        console.log(editedOrder);
        setIsEditing(false);
        onClose();
    };

    const handleDiscardClick = () => {
        console.log("Edit mode disactivated");
        setEditedOrder(ClientOrder);
        setIsEditing(false);
    };

    // handling select & date change
    const handleSelectChange = (value: string, name: string) => {
        setEditedOrder({ ...editedOrder, [name]: value });
      };

      const handleDateChange = (date: Moment) => {
        setEditedOrder({ ...editedOrder, date_commande: date.format('YYYY-MM-DD') });
      };
    const title = (
        <div className="flex justify-between items-center">
          <div>Details</div>
          <Space size="small" className='mr-[2rem]'>
            <Button 
                className='flex items-center gap-1' 
                onClick={handleEditClick}>
                <EditTwoTone />
                Edit
            </Button>
          </Space>
        </div>
      );
    
  
  return (
    <Modal
      width={"80.6%"}
      title={title}
      open={open}
      onOk={onClose}
      onCancel={()=>{
        if (isEditing) {
            handleDiscardClick();  // Reset changes when modal is cancelled in edit mode
          } else {
            onClose();  // Simply close the modal if not in edit mode
          }
      }}
      footer={isEditing ? [
        <Button key="discard" onClick={handleDiscardClick}>Discard</Button>,
        <Button key="save" type="primary" onClick={handleSaveClick}>Save</Button>
      ] : null} // Show footer buttons in edit mode
    >   
        {isEditing ? (
            // Form for editing product details
            <>
                <Descriptions bordered column={1} title={"Modify Order Details"}>
                    <Descriptions.Item label="Order ID">{editedOrder.id}</Descriptions.Item>
                    <Descriptions.Item label="Oder Name">
                        <Input value={editedOrder.nom_commande} name="nom_commande" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Date">
                        <Input value={editedOrder.date_commande} name="date_commande" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Status">
                        <Input value={editedOrder.etat_commande} name="etat_commande" onChange={handleInputChange} />
                    </Descriptions.Item>
                <Descriptions.Item label="Client ID">{editedOrder.client_id}</Descriptions.Item>
            </Descriptions>
        </>
        ) : 
        <>
            <Descriptions bordered column={1} title={"Order Details"}>
                <Descriptions.Item label="Order ID">{editedOrder.id}</Descriptions.Item>
                <Descriptions.Item label="Oder Name">{editedOrder.nom_commande}</Descriptions.Item>
                <Descriptions.Item label="Order Date">{editedOrder.date_commande}</Descriptions.Item>
                <Descriptions.Item label="Order Status">{editedOrder.etat_commande}</Descriptions.Item>
                <Descriptions.Item label="Client ID">{editedOrder.client_id}</Descriptions.Item>
            </Descriptions>
        </>
        }
    </Modal>
  );
};
