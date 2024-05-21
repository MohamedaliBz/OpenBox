import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, Descriptions, Space, Button, Input, Avatar, Upload, message } from 'antd';
import './supplierDetailsModal.css'
import { EditTwoTone } from '@ant-design/icons';
import { updateSupplier } from '../../../Api/supplierService'; // Import the update supplier mutation
import { Supplier } from '../../../Interfaces/Suppliers';
import { useAuth } from '../../../Context/AuthProvider';
import { toast } from 'react-toastify';
import supabase from '../../../Utils/supabase';


type SupplierDetailsModalProps = {
  supplier: Supplier;
  open: boolean;
  onClose: () => void;
};

export const SupplierDetailsModal: React.FC<SupplierDetailsModalProps> = ({ supplier, open, onClose }) => {

    const queryClient = useQueryClient();

    // Use useMutation to update a product
const { mutate: updatesupplier } = useMutation(updateSupplier, {
  onSuccess: () => {
    // Invalidate the 'suppliers' query to refetch the data
    queryClient.invalidateQueries('suppliers');
    // Close the modal after successful update
    setIsEditing(!isEditing);
    onClose();
  },
});

    const [isEditing, setIsEditing] = useState(false);
    const [editedSupplier, setEditedSupplier] = useState({...supplier});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSupplier({ ...editedSupplier, [name]: value });
    };

    const handleEditClick = () => {
        console.log("Edit mode activated");
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        // Add your logic to save the edited product to database
        updatesupplier(editedSupplier)
        console.log(editedSupplier);
        setIsEditing(false);
        onClose();
    };

    const handleDiscardClick = () => {
        console.log("Edit mode disactivated");
        setEditedSupplier(supplier);
        setIsEditing(false);
    };
    const title = (
        <div className="flex justify-between items-center">
          <div>Supplier Details</div>
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
    const bucketName = 'supplier-photos';
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
        return;
    }
    message.success('File uploaded successfully');
    console.log('File uploaded successfully:', data);

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
        setEditedSupplier({...supplier, photo: publicUrl });
        setImageUrl(publicUrl);
    }
  if (!supplier) return null; // If there is no product, don't render anything
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
                    {imageUrl ?<Avatar size={100} src={<img src={imageUrl} alt="avatar"/>} />: <p>Upload new supplier photo</p>}
                </Upload>
                <Descriptions bordered column={1} title={"Primary Details"}>
                    <Descriptions.Item label="Full Name">
                        <Input value={editedSupplier.name} name="name" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Number">
                        <Input value={editedSupplier.contact_number} name="contact_number" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <Input value={editedSupplier.email} name="email" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Adress">
                        <Input value={editedSupplier.adresse} name="adresse" onChange={handleInputChange} />
                    </Descriptions.Item>
                    
            </Descriptions>
        </>
        ) : 
        <>

            <Avatar size={100} src={<img src={supplier.photo} alt="avatar"/>} />
            <Descriptions bordered column={1} title={"Primary Details"}>
                <Descriptions.Item label="Full Name">{supplier.name}</Descriptions.Item>
                <Descriptions.Item label="Contact Number">{supplier.contact_number}</Descriptions.Item>
                <Descriptions.Item label="Email">{supplier.email}</Descriptions.Item>
                <Descriptions.Item label="Adress">{supplier.adresse}</Descriptions.Item>
            </Descriptions>
        </>
        }

    </Modal>
  );
};

