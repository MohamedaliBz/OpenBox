// src/components/ProfileModal.tsx

import React from 'react';
import { Modal, Descriptions, Avatar } from 'antd';
import { UserProfile } from '../../../Model/Interfaces/UserProfiles';

interface ProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userProfile: UserProfile;
}

const ProfileModalDetails: React.FC<ProfileModalProps> = ({ isOpen, closeModal, userProfile }) => {
  return (
    <Modal
      width={"50.6%"}
      title="User Profile"
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer = {null}
    >   
        {userProfile ? (
            <>
                <Avatar size={100} src={<img src={userProfile.profile_photo} alt="avatar"/>} />

                <Descriptions bordered column={1} title={"User Details"}>
                <Descriptions.Item label="Name">{userProfile.name}</Descriptions.Item>
                <Descriptions.Item label="Contact Number">{userProfile.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Email">{userProfile.email}</Descriptions.Item>
                <Descriptions.Item label="Role">{userProfile.role}</Descriptions.Item>

            </Descriptions>
        </>
        ) : (
        <p>No user profile data available !</p>
      )}

    </Modal>

  );
};

export default ProfileModalDetails;
