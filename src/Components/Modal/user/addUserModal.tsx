import React, { useState} from 'react';
import { Modal ,Input , Button, Upload ,message, Avatar , Select} from 'antd';
import supabase from '../../../Utils/supabase';
import { toast } from 'react-toastify';
import { useAuth } from '../../../Context/AuthProvider';
import useSignupWithProfile from '../../../Model/Services/useSignupWithProfile';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}
const { Option } = Select; // Destructure the necessary component from Select

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {

    const { user } = useAuth();
    const bucketName = 'user-photos';
    const [imageUrl, setImageUrl] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userProfile, setuserProfile] = useState({
        profile_photo: '',
        name: '',
        email: '',
        password: '',
        phone_number: 0,
        role: '',
  });
  
  const signupMutation = useSignupWithProfile();
  const resetForm = () => {
    setuserProfile({
        profile_photo: '',
        name: '',
        email: '',
        password: '',
        phone_number: 0,
        role: '',
    });
    setImageUrl('');
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuserProfile({ ...userProfile, [name]: value });
  };
  const handleRoleChange = (value: string) => {
    setuserProfile({ ...userProfile, role: value });
};
  const handleOk = () => {
    setConfirmLoading(true);
    signupMutation.mutate(userProfile);
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
      setuserProfile({...userProfile, profile_photo: publicUrl });
      setImageUrl(publicUrl);
  }

  return (
    <Modal
      className='custom-modal'
      title="New User"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Discard
        </Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
          Add User
        </Button>
      ]}
    >
      <Upload 
      listType="picture-circle"
      showUploadList={false}
      customRequest={({ file }) => handleUpload(file)}
      >
        {imageUrl ?<Avatar size={100} src={<img src={imageUrl} alt="avatar"/>} />: <p>Upload a user photo</p>}
      </Upload>
      <Input placeholder="Enter name" name="name" onChange={handleInputChange} />
      <Input placeholder="Enter email" name="email" onChange={handleInputChange} />
      <Input.Password 
            placeholder="Enter password"
            name="password"
            onChange={handleInputChange}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
      <Input placeholder="Enter contact number" name="phone_number" onChange={handleInputChange} />
      
      <Select 
            placeholder='Select a role for new user'
            onChange={handleRoleChange}
            value={userProfile.role || undefined}
            style={{ width: '100%'}}
            
          >
            <Option value="Admin">Admin</Option>
            <Option value="Stock Manager">Stock Manager</Option>
            <Option value="Warehouse Manager">Warehouse Manager</Option>
          </Select>
    </Modal>
  );
};
export default AddUserModal;
