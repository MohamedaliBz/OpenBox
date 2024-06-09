import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, Descriptions, Space, Button, Input, Avatar, Upload, message } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useAuth } from '../../../Context/AuthProvider';
import { toast } from 'react-toastify';
import supabase from '../../../Utils/supabase';
import { Client } from '../../../Model/Interfaces/Client';
import { updateClient } from '../../../Model/Services/clientService';


type userDetailsModalProps = {
  currentClient: Client;
  open: boolean;
  onClose: () => void;
};

export const ClientDetailsModal: React.FC<userDetailsModalProps> = ({ currentClient, open, onClose }) => {

    const queryClient = useQueryClient();

    // Use useMutation to update a supplier
    const { mutate: Updateclient } = useMutation(updateClient, {
        onSuccess: () => {
            // Invalidate the 'suppliers' query to refetch the data
            queryClient.invalidateQueries('clients');
            // Close the modal after successful update
            setIsEditing(!isEditing);
            onClose();
        },
        onError() {
            toast.error('Error while updating client')
        }
  })

    const [isEditing, setIsEditing] = useState(false);
    const [editedClient, setEditedClient] = useState({...currentClient});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedClient({ ...editedClient, [name]: value });
    };

    const handleEditClick = () => {
        console.log("Edit mode activated");
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        // Add your logic to save the edited product to database
        Updateclient(editedClient)
        console.log(editedClient);
        setIsEditing(false);
        onClose();
    };

    const handleDiscardClick = () => {
        console.log("Edit mode disactivated");
        setEditedClient(currentClient);
        setIsEditing(false);
    };

    const title = (
        <div className="flex justify-between items-center">
          <div>Client Details</div>
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
    
    const [imageUrl, setImageUrl] = useState<string>('');
    const { user } = useAuth();
    const bucketName = 'client-photos';
    const handleUpload = async (file : any) => {
    console.log({user});
    if(!user){
        toast.error('You must be logged in to upload files');
        return
    }
    const filePath = `${Date.now()}_${file.name}`; // Using the file name as the path
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath,file);
    if (error) {
        toast.error(`Upload failed : ${error.message}`,
        { autoClose:1500 , 
        position:'top-center',
        }
        );
        console.error('Error uploading file:', error);
        return ;
    }
    message.success('File uploaded successfully');    
    // Get the public URL
    const {data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    if (!publicUrl) {
        toast.error('Failed to get public URL',
        { autoClose:1000 , 
        position:'top-center',
        });
        return;
    }
        console.log('Public URL:', publicUrl);
        setEditedClient({...currentClient, client_photo: publicUrl });
        setImageUrl(publicUrl);
    }
  if (!currentClient) return null; // If there is no client, don't render anything
  return (
    <Modal
      width={"80.6%"}
      title={title}
      open={open}
      onOk={onClose}
      onCancel={()=>{
        isEditing ? (
            setIsEditing(false)
        ) : onClose()
      }}
      footer={isEditing ? [
        <Button key="discard" onClick={handleDiscardClick}>Discard</Button>,
        <Button key="save" type="primary" onClick={handleSaveClick}>Save</Button>
      ] : null} // Show footer buttons in edit mode
    >   
        {isEditing ? (
            // Form for editing product details
            <>
                <Upload 
                    listType="picture-circle"
                    showUploadList={false}
                    customRequest={({ file }) => handleUpload(file)}
                >
                    {imageUrl ?<Avatar size={100} src={<img src={imageUrl} alt="avatar"/>} />: <p>Upload new <b>Client</b> photo</p>}
                </Upload>
                <Descriptions bordered column={1} title={"Primary Details"}>
                    <Descriptions.Item label="Full Name">
                        <Input value={editedClient.name} name="name" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Number">
                        <Input value={editedClient.phone_number} name="phone_number" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <Input value={editedClient.email} name="email" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Adress">
                        <Input value={editedClient.adresse} name="adresse" onChange={handleInputChange} />
                    </Descriptions.Item>
            </Descriptions>
        </>
        ) : 
        <>
            <Avatar size={100} src={<img src={currentClient.client_photo} alt="avatar"/>} />
            <Descriptions bordered column={1} title={"Primary Details"}>
                <Descriptions.Item label="Client ID">{currentClient.id}</Descriptions.Item>
                <Descriptions.Item label="Full Name">{currentClient.name}</Descriptions.Item>
                <Descriptions.Item label="Contact Number">{currentClient.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Email">{currentClient.email}</Descriptions.Item>
                <Descriptions.Item label="Adress">{currentClient.adresse}</Descriptions.Item>
            </Descriptions>
        </>
        }
    </Modal>
  );
};

