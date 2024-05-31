import React, { useState , useRef } from 'react';
import { Modal ,Input , Select , DatePicker, Button, Divider, Space} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd'; 
import { Moment } from 'moment';
import './addProductModal.css'
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from '../../../Model/Services/productService'; // Import the createProduct function

let index = 0;
interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}
const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {

   // State and ref for the custom Select component
   const [items, setItems] = useState(['Clothes', 'Food']);
   const [name, setName] = useState('');
   const inputRef = useRef<InputRef>(null);
 
   const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setName(event.target.value);
   };
 
   const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
     e.preventDefault();
     setItems([...items, name || `New item ${index++}`]);
     setName('');
     setTimeout(() => {
       inputRef.current?.focus();
     }, 0);
   };

  /**********************************/

  const [confirmLoading, setConfirmLoading] = useState(false);

  const queryClient = useQueryClient();
  // Use useMutation to create a new product
  const { mutate: addProduct } = useMutation(createProduct, {
    onSuccess: () => {
      // Invalidate the 'products' query to refetch the data
      queryClient.invalidateQueries('products');
      // Close the modal after successful creation
      onClose();
      setConfirmLoading(false);
    },
    onError: () => {
      // Handle error if necessary
      setConfirmLoading(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    // Call the addProduct function with the product data
    addProduct(product);
  };

  
  const [product, setProduct] = useState({
    name: '',
    category: '',
    buying_price: 0,
    quantity: 0,
    unit: '',
    expiry_date: '',
    threshold_value: 0,
  });
  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onClose();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSelectChange = (value: string, name: string) => {
    setProduct({ ...product, [name]: value });
  };
  const handleDateChange = (date: Moment) => {
    setProduct({ ...product, expiry_date: date.format('YYYY-MM-DD') });
  };

  return (
   
      <Modal
        className='custom-modal'
        title="New Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Discard
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Add Product
          </Button>
        ]}
        >
         {/* Form fields */}
        <Input placeholder="Enter product name" name="name" onChange={handleInputChange} />
        <Select
        placeholder="Select product category"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={items.map((item) => ({ label: item, value: item }))}
        onChange={(value) => handleSelectChange(value, 'category')}
      />
        <Input placeholder="Enter buying price" name="buying_price" onChange={handleInputChange} />
        <Input placeholder="Enter product quantity" name="quantity" onChange={handleInputChange} />
        <Input placeholder="Enter product unit" name="unit" onChange={handleInputChange} />
        <DatePicker name='expiry_date' placeholder="Enter expiry date" onChange={handleDateChange} />
        <Input placeholder="Enter threshold value" name="threshold_value" onChange={handleInputChange} />
      </Modal>
  );
};

export default AddProductModal;