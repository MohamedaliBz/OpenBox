import { useEffect, useRef, useState } from "react";
import {DeleteTwoTone, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Avatar, Button,  Input, Modal, Space, Table, Tag } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FaDownload, FaFilter } from "react-icons/fa6";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { IoPersonAddSharp } from "react-icons/io5";
import { deleteClient, fetchClients } from "../../Model/Services/clientService";
import { Client } from "../../Model/Interfaces/Client";
import { ClientDetailsModal } from "../Modal/client/clientDetailsModal";
import AddClientModal from "../Modal/client/addClientModal";


type DataIndex = keyof Client;

const ClientTable = ()=>{
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery('clients',fetchClients)
    // Define the data state
    const [localData, setLocalData] = useState<Client[]>([]);
    // Using useEffect hook to synchronize localData with the data fetched by useQuery
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
    
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Client> => ({
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

     // using the mutate hook to delete a user profile 
    const { mutate: deleteMutation } = useMutation(deleteClient, {
        onSuccess: () => {
          // Invalidate and refetch : This ensures that the list of users is refetched from the server after a user is deleted
          queryClient.invalidateQueries('clients'); 
        },
        onError: (error) => {
          console.error('Error deleting client:', error);
        },
      });

     // modal to confirm the delete action
    const { confirm } = Modal;
    const showDeleteConfirm = (record : Client) => {
        confirm({
        title: 'Are you sure to delete this client ?',
        icon: <ExclamationCircleFilled />,
        content: 'For security purposes, please confirm your intent to delete this client. This operation cannot be undone.',
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

    const columns: TableColumnsType<Client> = [
        {
           title: '',
           dataIndex: 'client_photo',
           key: 'photo',
           render: (_, record) => (
            <Avatar src={record.client_photo} alt={record.name} />
        )
        },
        {
          title: 'Client Id',
          dataIndex: 'id',
          key: 'id',
          ...getColumnSearchProps('id'),
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['descend', 'ascend'],
          render : (id)=> (
            <Tag color={'cyan'}>{id}</Tag>
          )
        },  
        {
          title: 'Full Name',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('name'),
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone_number',
          key: 'phone_number',
          ...getColumnSearchProps('phone_number'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
            sorter : (a,b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Adress',
            dataIndex: 'adresse',
            key: 'adresse',
            ...getColumnSearchProps('adresse'),
            sorter : (a,b) => a.adresse.length - b.adresse.length,
            sortDirections: ['descend', 'ascend'],
            render: (adresse) => (
              <Tag color={'purple'}>{adresse}</Tag>
            ),
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
    
    // useState to control the model's state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // useState to control the detailsmodel's state
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    //Creating a state for the selected client
    const [selectedClient, setselectedClient] = useState<Client>();  
    //Creating a function to handle row click
    const onRowClick = (record: Client) => {
      setselectedClient(record); // Update the state with the clicked client
        setIsDetailsModalOpen(true); // Open the modal
    };

    const handleDownload = ()=>{
        if (!data) {
            toast.error("No data to download" , 
            {   autoClose:500 , 
                position:'top-center',
            })
            return;
          }
        // Convert the data to CSV
        const csv = Papa.unparse(localData);
        // Create a Blob with the CSV data
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        // Save the file
        saveAs(blob, 'clients.csv');
    }

return(
    <div className='ml-[20rem] w-[80%] mt-[-47rem]'>
      <div className='flex justify-between p-4 bg-white rounded-lg h-[5rem] items-center '>
        <h1 className='text-xl font-medium leading-[30px]'>Clients</h1>
        <div className='flex gap-4 mr-4'>
          <Button type='primary' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={handleOpenModal}>
            <IoPersonAddSharp style={{fontSize: "1rem",}}/>
              Add Client
          </Button>
          <AddClientModal open={isModalOpen} onClose={handleCloseModal} />
          <Button type='default' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={handleDownload}>
            <FaDownload style={{fontSize: "1rem",}} />
              Download all
          </Button>
          <Button type='default' className='flex gap-2 items-center text-[1rem] py-[1.1rem]' onClick={() => null}>
            <FaFilter style={{fontSize: "1rem",}} />
              Filter
          </Button>

        </div>
      </div>

      { selectedClient && (<ClientDetailsModal currentClient={selectedClient} open={isDetailsModalOpen} onClose={handleCloseDetailsModal} />)}
      
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching users</div>
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
)}
export default ClientTable