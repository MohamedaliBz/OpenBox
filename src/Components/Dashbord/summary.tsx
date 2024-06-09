import { useQuery } from "react-query";
import { Alert, Divider, Spin, message } from "antd";
import sales from "../../Assets/icons/Sales.svg"
import cost from "../../Assets/icons/Cost.svg"
import revenue from "../../Assets/icons/Revenue.svg"
import profit from "../../Assets/icons/Profit.svg"
import client from "../../Assets/icons/Suppliers.svg"
import categories from "../../Assets/icons/Categories.svg"

import { Product } from "../../Model/Interfaces/Products";
import { fetchProducts } from "../../Model/Services/productService";
import { fetchClients } from "../../Model/Services/clientService";
import { fetchClientOrders } from "../../Model/Services/ClientOrder";
import { fetchSuppliers } from "../../Model/Services/supplierService";


const calculateMetrics = (products : Product[]) => {
  const totalCost = products.reduce((acc, product) => acc + product.selling_price * product.quantity + 2, 0);
  const totalProducts = products.sort((a, b) => b.quantity - a.quantity);
  const totalarticles = totalProducts.reduce((acc, product) => acc + product.quantity, 0);
  const topSellingRevenue = totalProducts.reduce((acc, product) => acc + product.selling_price * product.quantity, 0);
  const lowStocks = products.filter((product) => product.quantity<product.threshold_value && product.quantity>0).length;
  const outOfStock = products.filter((product) => product.quantity === 0).length;
  return {
    totalCost,
    totalarticles,
    topSellingRevenue,
    lowStocks,
    outOfStock,
  };
};

export default function InventorySummary() {

  const { data : suppliers } = useQuery('suppliers',fetchSuppliers)
  // const { data : supplirOrders } = useQuery('supplierOrders',fetchClientOrders)
  const nbrSuppliers = suppliers?.length
  // const nbrclientOrders = clientOrders?.length

    const { data: products, error, isLoading } = useQuery('products', fetchProducts);
    if (isLoading) {
      return <Spin tip="Loading products..." />;
    }
    if (error) {
      return <Alert message="Error" description="Failed to load products." type="error" showIcon />;
    }
  const metrics = calculateMetrics(products as Product[]);

  return (
        <div className="flex gap-[1rem] items-center mb-4"> 
          <div className="bg-white w-[590px] h-[180px] rounded-lg p-4">
            <div className=" text-xl leading-[30px] font-medium">
              Sales Overview
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={sales} width={"40"}/>
                  <div className="flex font-semibold items-center">
                    <div className="text-gray-600 mr-8">$850</div>
                    <div className="text-gray-600 font-light text-[15px]">Sales</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={revenue} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">$850</div>
                    <div className="text-gray-600 font-light text-[15px]">Revenue</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={profit} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">$850</div>
                    <div className="text-gray-600 font-light text-[15px]">Profit</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                <img src={cost} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">${metrics.totalCost}</div>
                    <div className="text-gray-600 font-light text-[15px]">Cost</div>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-white w-[384px] h-[180px] rounded-lg p-4">
            <div className=" text-xl leading-[30px] font-medium">
              Supplier Summary
            </div>
            <div className="flex items-center justify-around p-4">
              <div className="flex flex-col items-center gap-[0.7rem]">
                  <img src={client} width={"40"}/>
                  <div className="flex flex-col font-semibold items-center ">
                    <div className="text-gray-600">{nbrSuppliers}</div>
                    <div className="text-gray-600 font-light text-[15px]">Number of Suppliers</div>
                  </div>
              </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[0.7rem]">
                  <img src={categories} width={"40"}/>
                  <div className="flex flex-col font-semibold items-center ">
                    <div className="text-gray-600">2</div>
                    <div className="text-gray-600 font-light text-[15px]">Supplier Orders</div>
                  </div>
              </div>

            </div>
          </div>
        </div>    
  );
}