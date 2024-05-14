import{ useEffect, useRef, useState } from 'react';
import {DeleteTwoTone, ExclamationCircleFilled, FilterTwoTone, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button,  Input, Modal, Select, Space, Table, Tag } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import  {fetchProducts} from '../../Api/productService';
import { MdOutlineAddTask } from "react-icons/md";
import { FaDownload, FaFilter } from "react-icons/fa6";
import AddProductModal from '../Modal/addProductModal';
import { Product } from '../../Interfaces/Products';
import { deleteProduct } from '../../Api/productService';
import { ProductDetailsModal } from '../Modal/productDetailsModal';
import './ProductTable.css'
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { Option } from 'antd/es/mentions';


type DataIndex = keyof Product;

const ProductTable = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery('products', fetchProducts);
  // Define the data state
  const [localData, setLocalData] = useState<Product[]>([]);
  // Use the useEffect hook to synchronize localData with the data fetched by useQuery
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Product> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const { mutate: deleteMutation } = useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidate and refetch : This ensures that the list of products is refetched from the server after a product is deleted
      queryClient.invalidateQueries('products'); 
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
    },
  });

  // modal to confirm the delete action
  const { confirm } = Modal;
  const showDeleteConfirm = (record : Product) => {
    confirm({
      title: 'Are you sure to delete this Product ?',
      icon: <ExclamationCircleFilled />,
      content: 'For security purposes, please confirm your intent to delete this product. This operation cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Discard',
      className :"",
      onOk() {
        console.log('Delete:', record);
        deleteMutation(record.id);
      }
  });
};

  const columns: TableColumnsType<Product> = [
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Byuing Price',
      dataIndex: 'buying_price',
      key: 'buying_price',
      ...getColumnSearchProps('buying_price'),
      sorter : (a,b)=> a.buying_price - b.buying_price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      ...getColumnSearchProps('quantity'),
      sorter : (a,b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'ThresHold Value',
      dataIndex: 'threshold_value',
      key: 'threshold_value',
      ...getColumnSearchProps('threshold_value'),
      sorter : (a,b) => a.threshold_value - b.threshold_value,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
      ...getColumnSearchProps('expiry_date'),
      sorter : (a,b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      ...getColumnSearchProps('availability'),
      sorter: (a, b) => {
      const quantityA = a.quantity;
      const quantityB = b.quantity;
      const thresholdA = a.threshold_value;
      const thresholdB = b.threshold_value;

      // Define the new order of stock statuses
      const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

      // Determine the stock status of a
      const statusA = quantityA === 0 ? 'Out of Stock' : (quantityA < thresholdA ? 'Low Stock' : 'In Stock');

      // Determine the stock status of b
      const statusB = quantityB === 0 ? 'Out of Stock' : (quantityB < thresholdB ? 'Low Stock' : 'In Stock');

      // Compare the indices of the stock statuses in the statuses array
      return statuses.indexOf(statusA) - statuses.indexOf(statusB);
      },
      render : (_,record,inedx)=>{
        let color = 'green';
        let text = 'In Stock';
        if (record.quantity === 0 ) {
          color = 'red';
          text = 'Out of Stock';
          
        } else if (record.quantity < record.threshold_value) {
          color = 'orange';
          text = 'Low Stock';
        }
        return(
          <Tag color={color}>
              {text}
          </Tag>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',

      render: (_ ,record) => (
        <Space size="small">
          <Button danger className='flex items-center gap-1' onClick={(event) => {showDeleteConfirm(record); event.stopPropagation()}}><DeleteTwoTone twoToneColor="red"/>Delete</Button>
        </Space>
        ),
  },
  ];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  //Create a state for the selected product
  const [selectedProduct, setSelectedProduct] = useState<Product >();  

  //Create a function to handle row click
  const onRowClick = (record: Product) => {
    setSelectedProduct(record); // Update the state with the clicked product
    setIsDetailsModalOpen(true); // Open the modal
  };

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  // Helper function to determine the availability status of a product
  const getAvailabilityStatus = (product: Product) => {
    if (product.quantity === 0) {
      return 'Out of Stock';
    } else if (product.quantity < product.threshold_value) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  };

  const handleDownload = () => {
    if (!data) {
      toast.error("No data to download" , 
      {   autoClose:500 , 
          position:'top-center',
      })
      return;
    } 

// Modify the availability property of each product object
const dataWithAvailabilityStatus = data.map(product => ({
  ...product,
  availability: getAvailabilityStatus(product),
}));

  // Convert the data to CSV
  const csv = Papa.unparse(dataWithAvailabilityStatus);
  // Create a Blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  // Save the file
  saveAs(blob, 'products.csv');
  }

  // Define filter options type
  type FilterOption = 'All' | 'In Stock' | 'Low Stock' | 'Out of Stock';

  // Add a state for the filter visibility and selected option
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  // Implement the filter function
  const handleFilter = (filterOption: FilterOption) => {
    let filteredData : Product[] = []; // Initialize filteredData as an empty array
    if (data){
      switch (filterOption) {
        case 'Out of Stock':
        case 'Low Stock':
        case 'In Stock':
          filteredData = data.filter(product => getAvailabilityStatus(product) === filterOption);
          break;
        default:
          // No filtering applied
          filteredData = [...data]
          break;
      }
    }
    // Update the localData state with the filtered data
    setLocalData(filteredData);
  }

  return(
    <div className='w-[80%] ml-[20rem] mt-4'>
      <div className='flex justify-between p-4 bg-white rounded-lg h-[5rem] items-center '>
        <h1 className='text-xl font-medium leading-[30px]'>Products</h1>
        <div className='flex gap-4 mr-4'>
          <Button type='primary' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={handleOpenModal}>
            <MdOutlineAddTask style={{fontSize: "1rem",}}/>
              Add Product
          </Button>
          <AddProductModal open={isModalOpen} onClose={handleCloseModal} />
          <Button type='default' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={handleDownload}>
            <FaDownload style={{fontSize: "1rem",}} />
              Download all
          </Button>
          <Button type='default' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={() => setIsFilterVisible(!isFilterVisible)}>
            <FaFilter style={{fontSize: "1rem",}} />
              Filter
          </Button>

        </div>
      </div>

      {isFilterVisible && (
        <div className='p-1 flex justify-end bg-[#fafafa]'>
          <Select className='' defaultValue="All" style={{ width: 120 }} onChange={handleFilter}>
            <Option value="All">All</Option>
            <Option value="In Stock">In Stock</Option>
            <Option value="Low Stock">Low Stock</Option>
            <Option value="Out of Stock">Out of Stock</Option>
          </Select>
        </div>
        )
      }

      {selectedProduct && (<ProductDetailsModal product={selectedProduct} open={isDetailsModalOpen} onClose={handleCloseDetailsModal} />)}
      
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching products</div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={localData || data}
          onRow={(record) => ({
            onClick: () => onRowClick(record), // Call the onRowClick function when a row is clicked
          })} 
          />
          
        )}
        
    </div>
    )
};
export default ProductTable