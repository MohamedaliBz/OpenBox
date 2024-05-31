import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, Descriptions, Space, Button, Input, Avatar, Upload, message } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useAuth } from '../../../Context/AuthProvider';
import { toast } from 'react-toastify';
import supabase from '../../../Utils/supabase';
import { updateUserProfile } from '../../../Model/Services/userService';
import { UserProfile } from '../../../Model/Interfaces/UserProfiles';


type userDetailsModalProps = {
  currentUser: UserProfile;
  open: boolean;
  onClose: () => void;
};

export const UserDetailsModal: React.FC<userDetailsModalProps> = ({ currentUser, open, onClose }) => {

    const queryClient = useQueryClient();

    // Use useMutation to update a supplier
    const { mutate: Updateuser } = useMutation(updateUserProfile, {
        onSuccess: () => {
            // Invalidate the 'suppliers' query to refetch the data
            queryClient.invalidateQueries('userProfiles');
            // Close the modal after successful update
            setIsEditing(!isEditing);
            onClose();
        },
        onError() {
            toast.error('Error while updating userProfile')
        }
  })

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({...currentUser});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleEditClick = () => {
        console.log("Edit mode activated");
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        // Add your logic to save the edited product to database
        Updateuser(editedUser)
        console.log(editedUser);
        setIsEditing(false);
        onClose();
    };

    const handleDiscardClick = () => {
        console.log("Edit mode disactivated");
        setEditedUser(currentUser);
        setIsEditing(false);
    };

    const title = (
        <div className="flex justify-between items-center">
          <div>User Details</div>
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
    const bucketName = 'user-photos';
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
        setEditedUser({...currentUser, profile_photo: publicUrl });
        setImageUrl(publicUrl);
    }
  if (!currentUser) return null; // If there is no product, don't render anything
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
                        <Input value={editedUser.name} name="name" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Number">
                        <Input value={editedUser.phone_number} name="phone_number" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Role">
                        <Input value={editedUser.role} name="role" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
            </Descriptions>
        </>
        ) : 
        <>
            <Avatar size={100} src={<img src={currentUser.profile_photo} alt="avatar"/>} />
            <Descriptions bordered column={1} title={"Primary Details"}>
                <Descriptions.Item label="Full Name">{currentUser.name}</Descriptions.Item>
                <Descriptions.Item label="Contact Number">{currentUser.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Role">{currentUser.role}</Descriptions.Item>
                <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
            </Descriptions>
        </>
        }
    </Modal>
  );
};

