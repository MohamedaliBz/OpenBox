import React, { useState } from 'react';
import { Button, Modal, Table, Form, InputNumber, DatePicker, Space, Popconfirm } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchClientOrderLines, createClientOrderLine, updateClientOrderLine, deleteClientOrderLine } from '../../../Model/Services/ClientOrderLine';
import moment from 'moment';
import { ClientOrderLine } from '../../../Model/Interfaces/ClientOrderLine';

type ClientOrderLineModalProps = {
    orderId: number;
    open: boolean;
    onClose: () => void;
};

const ClientOrderLineModal: React.FC<ClientOrderLineModalProps> = ({ orderId, open, onClose }) => {
    const queryClient = useQueryClient();
    const { data: lines, isLoading, isError } = useQuery(['clientOrderLines', orderId], () => fetchClientOrderLines(orderId), {
        enabled: !!orderId  // Only run the query if orderId is available
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingKey, setEditingKey] = useState<number | null>(null);
    const [form] = Form.useForm();

    const { mutate: addLine } = useMutation(createClientOrderLine, {
        onSuccess: () => {
            queryClient.invalidateQueries(['clientOrderLines', orderId]);
            form.resetFields();
        },
        onError: (error) => {
            console.error('Error adding client order line:', error);
        }
    });

    const { mutate: updateLine } = useMutation(updateClientOrderLine, {
        onSuccess: () => {
            queryClient.invalidateQueries(['clientOrderLines', orderId]);
            setEditingKey(null);
        },
        onError: (error) => {
            console.error('Error updating client order line:', error);
        }
    });

    const { mutate: deleteLine } = useMutation(deleteClientOrderLine, {
        onSuccess: () => {
            queryClient.invalidateQueries(['clientOrderLines', orderId]);
        },
        onError: (error) => {
            console.error('Error deleting client order line:', error);
        }
    });

    const isEditingRecord = (record: any) => record.id === editingKey;

    const edit = (record: any) => {
        form.setFieldsValue({ ...record, date_cmdc: moment(record.date_cmdc) });
        setEditingKey(record.id);
        setIsEditing(true);
    };

    const cancel = () => {
        setEditingKey(null);
        setIsEditing(false);
    };

    const save = async (id: number) => {
        try {
            const row = await form.validateFields();
            if(lines){
               const newData = [...lines];
            const index = newData.findIndex((item) => id === item.id);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row, date_cmdc: row.date_cmdc.format('YYYY-MM-DD') });
                    updateLine(newData[index]);
                } 
            }
            
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantite_cmdc',
            key: 'quantite_cmdc',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'prix',
            key: 'prix',
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'date_cmdc',
            key: 'date_cmdc',
            render: (date: string) => moment(date).format('YYYY-MM-DD'),
            editable: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record : ClientOrderLine ) => {
                const editable = isEditingRecord(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button onClick={() => edit(record)}>Edit</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteLine(record.id)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: col.dataIndex === 'date_cmdc' ? 'date' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditingRecord(record),
            }),
        };
    });

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }: any) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <DatePicker />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[{ required: true, message: `Please Input ${title}!` }]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const onCreate = (values: any) => {
        const newLine = { ...values, commande_client_id: orderId, date_cmdc: values.date_cmdc.format('YYYY-MM-DD') };
        addLine(newLine);
    };

    const addForm = (
        <Form form={form} layout="inline" onFinish={onCreate}>
            <Form.Item name="quantite_cmdc" rules={[{ required: true, message: 'Please input quantity!' }]}>
                <InputNumber placeholder="Quantity" />
            </Form.Item>
            <Form.Item name="prix" rules={[{ required: true, message: 'Please input price!' }]}>
                <InputNumber placeholder="Price" />
            </Form.Item>
            <Form.Item name="date_cmdc" rules={[{ required: true, message: 'Please input date!' }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Line
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Modal
            title="Client Order Lines"
            onCancel={onClose}
            open={open}
            width={"80.6%"}
            footer={
                <Button onClick={onClose}>
                    Close
                </Button>
            }
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching Client Orders</div>
            ) : (
                <Form form={form} component={false}>
                    {addForm}
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={lines}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </Form>
            )}
        </Modal>
    );
};

export default ClientOrderLineModal;
