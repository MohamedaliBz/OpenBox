import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { Spin, Alert } from 'antd';
import { fetchProducts } from '../../Model/Services/productService';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface Product {
  id: string;
  name: string;
  buying_price: number;
  quantity: number;
  threshold_value: number;
  category: string;
  expiry_date: string;
  availability: string;
}

const StockDistribution: React.FC = () => {
  const { data, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) {
    return <Spin tip="Loading products..." />;
  }

  if (error) {
    return <Alert message="Error" description="Failed to load products." type="error" showIcon />;
  }

  
    const inStockCount = data?.filter((p: Product) => p.quantity > p.threshold_value).length;
    const lowStockCount = data?.filter((p: Product) => p.quantity > 0 && p.quantity <= p.threshold_value).length;
    const outOfStockCount = data?.filter((p: Product) => p.quantity === 0).length;
  
  const chartData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [inStockCount, lowStockCount, outOfStockCount],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (

    <div className="flex gap-[1rem] items-center mb-4"> 
             <div className="bg-white w-[390px] h-[370px] rounded-lg p-4">
                <div className=" text-xl leading-[30px] font-medium">
                    Stock Distribution
                </div>
                <div className='h-[95%] flex justify-center'> 
                  <Pie data={chartData}/>
                </div>


            </div>
    </div>

  );
};

export default StockDistribution;
