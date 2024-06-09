import { useQuery } from "react-query";
import { Divider } from "antd";
import quantities from "../../Assets/icons/Quantity.svg"
import ontheway from "../../Assets/icons/On the way.svg"
import { fetchProducts } from "../../Model/Services/productService";
import proc from "../../Assets/icons/proc.png"
import shipped from "../../Assets/icons/shipped.png"
import canceled from "../../Assets/icons/annuler.png"
import returned from "../../Assets/icons/boite-de-retour.png"

export default function ProductSummary() {

  const { data : products } = useQuery('products',fetchProducts)
    // const { data : supplirOrders } = useQuery('supplierOrders',fetchClientOrders)
    const totalProducts = products?.sort((a, b) => b.quantity - a.quantity);
    const totalarticles = totalProducts?.reduce((acc, product) => acc + product.quantity, 0);
    // const nbrclientOrders = clientOrders?.length

  return (
        <div className="flex gap-[1rem] items-center mb-4"> 
          <div className="bg-white w-[590px] h-[180px] rounded-lg p-4">
            <div className=" text-xl leading-[30px] font-medium">
              Purchese Overview
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={proc} width={"40"}/>
                  
                  <div className="flex font-semibold items-center">
                    <div className="text-gray-600 mr-8">23</div>
                    <div className="text-gray-600 font-light text-[15px]">Processing</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={shipped} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">10</div>
                    <div className="text-gray-600 font-light text-[15px]">shipped</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                  <img src={canceled} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">4</div>
                    <div className="text-gray-600 font-light text-[15px]">Canceled</div>
                  </div>
                </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[1.5rem]">
                <img src={returned} width={"40"}/>
                  <div className="flex font-semibold">
                    <div className="text-gray-600 mr-8">1</div>
                    <div className="text-gray-600 font-light text-[15px]">Returned</div>
                  </div>
                </div>
            </div>
          </div>

          

          <div className="bg-white w-[384px] h-[180px] rounded-lg p-4">
            <div className=" text-xl leading-[30px] font-medium">
              Product Summary
            </div>
            <div className="flex items-center justify-around p-4">
              <div className="flex flex-col items-center gap-[0.7rem]">
                  <img src={quantities} width={"40"}/>
                  <div className="flex flex-col font-semibold items-center ">
                    <div className="text-gray-600">{totalarticles}</div>
                    <div className="text-gray-600 font-light text-[15px]">Quantity in hand</div>
                  </div>
              </div>
                <Divider type="vertical" style={{border :'1px solid #E5E7EB',height:'5rem'}}/>
                <div className="flex flex-col items-center gap-[0.7rem]">
                  <img src={ontheway} width={"40"}/>
                  <div className="flex flex-col font-semibold items-center ">
                    <div className="text-gray-600">100</div>
                    <div className="text-gray-600 font-light text-[15px]">To be recieved</div>
                  </div>
              </div>

            </div>
          </div>
        </div>    
  );
}