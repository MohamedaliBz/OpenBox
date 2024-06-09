import React from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../../Model/Services/productService';
import { Spin, Alert } from 'antd';
import { Product } from '../../Model/Interfaces/Products';

const calculateMetrics = (products : Product[]) => {
  const categories = new Set(products.map((product) => product.category)).size;
  const totalProductstype = products.length;
  const totalCost = products.reduce((acc, product) => acc + product.buying_price * product.quantity, 0);
  const totalProducts = products.sort((a, b) => b.quantity - a.quantity);
  const totalarticles = totalProducts.reduce((acc, product) => acc + product.quantity, 0);
  const topSellingRevenue = totalProducts.reduce((acc, product) => acc + product.selling_price * product.quantity, 0);
  const lowStocks = products.filter((product) => product.quantity<product.threshold_value && product.quantity>0).length;
  const outOfStock = products.filter((product) => product.quantity === 0).length;

  return {
    categories,
    totalProductstype,
    totalCost,
    totalarticles,
    topSellingRevenue,
    lowStocks,
    outOfStock,
  };
};

const OverallInventory = () => {
  const { data: products, error, isLoading } = useQuery('products', fetchProducts);
  if (isLoading) {
    return <Spin tip="Loading products..." />;
  }
  if (error) {
    return <Alert message="Error" description="Failed to load products." type="error" showIcon />;
  }
  const metrics = calculateMetrics(products as Product[]);  

  
  return (
    <div className="text-lg text-grey-800 flex flex-col justify-center border border-solid border-gray-200 rounded-lg w-[80%] ml-[20rem] mt-[-47rem] p-4 bg-white ">
      <div className=" text-xl leading-[30px] font-medium">
        Overall Inventory
      </div>
      <div className="flex justify-center items-center gap-[5rem] mt-[1rem]">
        <div className="w-[108px] flex flex-col items-start justify-start gap-[12px] text-primary-primary-500">
          <div className="relative leading-[24px] font-semibold text-blue-600">
            Categories
          </div>
          <div className="relative leading-[24px] font-semibold text-grey-grey-600">
            {metrics.categories}
          </div>
          <div className="relative text-sm leading-[20px] text-grey-grey-400">
            Last 7 days
          </div>
        </div>
        <div className="box-border w-px h-[100px] border-r-[1px] border-solid border-grey-grey-50" />
        <div className="w-[188px] flex flex-col items-start justify-start gap-[12px] text-peru">
          <div className="relative leading-[24px] font-semibold text-yellow-600">
            Total Products
          </div>
          <div className="flex flex-col items-start justify-start gap-[12px] text-grey-grey-600">
            <div className="flex flex-row items-start justify-start gap-[91px]">
              <div className="relative leading-[24px] font-semibold">{metrics.totalProductstype}</div>
              <div className="relative leading-[24px] font-semibold">
                ${metrics.totalCost}
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[47px] text-sm text-grey-grey-400">
              <div className="relative leading-[20px]">Last 7 days</div>
              <div className="relative leading-[20px]">Cost</div>
            </div>
          </div>
        </div>
        <div className="box-border w-px h-[100px] border-r-[1px] border-solid border-grey-grey-50" />
        <div className="w-[205px] flex flex-col items-start justify-start gap-[12px] text-mediumpurple">
          <div className="relative leading-[24px] font-semibold text-purple-600">
            Stock Value
          </div>
          <div className="flex flex-col items-start justify-start gap-[12px] text-grey-grey-600">
            <div className="flex flex-row items-start justify-start gap-[139px]">
              <div className="relative leading-[24px] font-semibold">{metrics.totalarticles}</div>
              <div className="relative leading-[24px] font-semibold">${metrics.topSellingRevenue}</div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-between text-sm text-grey-grey-400">
              <div className="relative leading-[20px]">Last 7 days</div>
              <div className="relative leading-[20px]">Value</div>
            </div>
          </div>
        </div>
        <div className="box-border w-px h-[100px] border-r-[1px] border-solid border-grey-grey-50" />
        <div className="w-[235px] flex flex-col items-start justify-start gap-[12px] text-error-error-400">
          <div className="relative leading-[24px] font-semibold text-pink-600">
            Low Stock
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[10rem] text-grey-grey-600">
            <div className="relative leading-[24px] font-semibold">{metrics.lowStocks}</div>
            <div className="relative leading-[24px] font-semibold">{metrics.outOfStock}</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[95px] text-sm text-grey-grey-400">
            <div className="relative leading-[20px]">Low stock</div>
            <div className="relative leading-[20px]">Not in stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallInventory;
