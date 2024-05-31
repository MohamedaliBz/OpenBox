import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, Descriptions, Space, Button, Input } from 'antd';
import { Product } from '../../../Model/Interfaces/Products';
import './productDetailsModal.css'
import { EditTwoTone } from '@ant-design/icons';
import { updateProduct } from '../../../Model/Services/productService'; // Import the createProduct function


type ProductDetailsModalProps = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, open, onClose }) => {

    const queryClient = useQueryClient();

    // Use useMutation to update a product
const { mutate: updateProd } = useMutation(updateProduct, {
  onSuccess: () => {
    // Invalidate the 'products' query to refetch the data
    queryClient.invalidateQueries('products');
    // Close the modal after successful update
    setIsEditing(!isEditing);
    onClose();
  },
});

    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({...product});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleEditClick = () => {
        console.log("Edit mode activated");
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        // Add your logic to save the edited product to database
        updateProd(editedProduct)
        console.log(editedProduct);
        setIsEditing(false);
        onClose();
    };

    const handleDiscardClick = () => {
        console.log("Edit mode disactivated");
        setEditedProduct(product);
        setIsEditing(false);
    };
    const title = (
        <div className="flex justify-between items-center">
          <div>Product Details</div>
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
  if (!product) return null; // If there is no product, don't render anything
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
      ] : null} // Show footer buttons when in edit mode
    >   
        {isEditing ? (
            // Form for editing product details
            <>
                <Descriptions bordered column={1} title={"Primary Details"}>
                    <Descriptions.Item label="Name">
                        <Input value={editedProduct.name} name="name" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                        <Input value={editedProduct.category} name="category" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Buying Price">
                        <Input value={editedProduct.buying_price.toString()} name="buying_price" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Quantity">
                        <Input value={editedProduct.quantity.toString()} name="quantity" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Threshold Value">
                        <Input value={editedProduct.threshold_value.toString()} name="threshold_value" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Expiry Date">
                        <Input value={editedProduct.expiry_date} name="expiry_date" onChange={handleInputChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Availability">
                        {product.availability}
                    </Descriptions.Item>
            </Descriptions>
            
        </>
        ) : 
        <>
            <Descriptions bordered column={1} title={"Primary Details"}>
                <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
                <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
                <Descriptions.Item label="Buying Price">{product.buying_price.toString()}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{product.quantity.toString()}</Descriptions.Item>
                <Descriptions.Item label="Threshold Value">{product.threshold_value.toString()}</Descriptions.Item>
                <Descriptions.Item label="Expiry Date">{product.expiry_date}</Descriptions.Item>
                <Descriptions.Item label="Availability">{product.availability}</Descriptions.Item>
            </Descriptions>

        </>
        }

    </Modal>
  );
};

