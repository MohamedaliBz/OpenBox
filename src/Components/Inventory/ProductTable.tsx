import filter from '../../Assets/icons/filter.svg'

// import {Button}  from "@material-tailwind/react";

interface ButtonProps {
    // onClick: () => void;
    icon : string
    name: string; 
  }
const Buttton: React.FC<ButtonProps> = (props:ButtonProps) => {
    return (
        <div className="absolute top-[19px] left-[848px] rounded flex flex-row items-start justify-start text-grey-grey-600 border-[1px] border-solid border-grey-grey-100">
            <button>
               <div className="shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg overflow-hidden flex flex-row items-center justify-center py-2.5 px-4 gap-[8px]">
                    <img
                        className="w-5 relative h-5 overflow-hidden shrink-0"
                        alt=""
                        src={props.icon}
                    />
                    <div className="relative leading-[20px] font-medium">
                        {props.name}
                    </div> 
                </div>
            </button>
      </div>
    );
  };
  interface Product {
    name: string;
    buyingPrice: number;
    quantity: number;
    thresholdValue: number;
    expiryDate: string;
    availability: string;
  }
  

  const Table: React.FC<{ items: Product[] }> = ({ items }) => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Buying Price</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Threshold Value</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Availability</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.buyingPrice}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.thresholdValue}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.expiryDate}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const products: Product[] = [
    {
      name: 'Maggi',
      buyingPrice: 430,
      quantity: 43,
      thresholdValue: 12,
      expiryDate: '11/12/22',
      availability: 'In-stock',
    },
    {
      name: 'Bru',
      buyingPrice: 257,
      quantity: 22,
      thresholdValue: 12,
      expiryDate: '21/12/22',
      availability: 'Out of stock',
    },
  ]

export default function ProductTable() {
  return (

    <>

        
        <div className="absolute top-[19px] left-[848px] rounded flex flex-row items-start justify-start text-grey-grey-600 border-[1px] border-solid border-grey-grey-100">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke="#5D6679" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>Filtres</span>
            </button>
        </div>

        <div className=" rounded flex flex-row items-start justify-start text-grey-grey-600 border-[1px] border-solid border-grey-grey-100">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                    <span>Download</span>
                </button>
        </div>

        <div className="absolute top-[28px] left-[16px] text-xl leading-[30px] font-medium text-grey-grey-800">
          Products
        </div>

        <button className="absolute top-[19px] left-[720px] rounded bg-sky-500 w-[115px] flex flex-row items-center justify-center py-2.5 px-4 box-border text-white bg-color[blue]">
          <div className="relative leading-[20px] font-medium">Add Product</div>
        </button>
        {/* <div className="absolute top-[81px] left-[17px] leading-[20px] font-medium text-grey-grey-500">
          Products
        </div>
        <div className="absolute top-[81px] left-[219px] leading-[20px] font-medium text-grey-grey-500">
          Buying Price
        </div>
        <div className="absolute top-[81px] left-[416px] leading-[20px] font-medium text-grey-grey-500">
          Quantity
        </div>
        <div className="absolute top-[81px] left-[594px] leading-[20px] font-medium text-grey-grey-500">
          Threshold Value
        </div>
        <div className="absolute top-[81px] left-[807px] leading-[20px] font-medium text-grey-grey-500">
          Expiry Date
        </div>
        <div className="absolute top-[81px] left-[983px] leading-[20px] font-medium text-grey-grey-500">
          Availability
        </div> */}

    </>
  )
}