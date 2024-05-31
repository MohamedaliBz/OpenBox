import React, { useState} from 'react';
import { Modal ,Input , Button, Upload ,message, Avatar , Select} from 'antd';
import supabase from '../../../Utils/supabase';
import { toast } from 'react-toastify';
import { useAuth } from '../../../Context/AuthProvider';
import useSignupWithProfile from '../../../Model/Services/useSignupWithProfile';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import { createClient } from '../../../Model/Services/clientService';

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
}
const AddClientModal: React.FC<AddClientModalProps> = ({ open, onClose }) => {

  const { user } = useAuth();
  const bucketName = 'supplier-photos';
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [client, setClient] = useState({
    client_photo: '',
    name: '',
    phone_number: 0,
    email: '',
    adresse: '',
  });

  const resetForm = () => {
    setClient({
      client_photo: '',
      name: '',
      phone_number: 0,
      email: '',
      adresse: '',
    });
    setImageUrl('');
  };
  
  const { mutate: addClient } = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
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
    setClient({ ...client, [name]: value });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    addClient(client);
  };

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
      setClient({...client, client_photo: publicUrl });
      setImageUrl(publicUrl);
  }

  return (
    <Modal
      className='custom-modal'
      title="New Client"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Discard
        </Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
          Add Client
        </Button>
      ]}
    >
      <Upload 
      listType="picture-circle"
      showUploadList={false}
      customRequest={({ file }) => handleUpload(file)}
      >
        {imageUrl ?<Avatar size={100} src={<img src={imageUrl} alt="avatar"/>} />: <p>Upload a supplier photo</p>}
      </Upload>
      <Input placeholder="Enter client full name" name="name" onChange={handleInputChange} />
      <Input placeholder="Enter clent email" name="email" onChange={handleInputChange} />
      <Input placeholder="Enter contact number" name="phone_number" onChange={handleInputChange} />
      <Input placeholder="Enter client address" name="adresse" onChange={handleInputChange} />
    </Modal>
  );
};
export default AddClientModal;
