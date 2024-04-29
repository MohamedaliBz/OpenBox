import filter from '../../Assets/icons/filter-icon.png'


interface ButtonProps {
    onClick: () => void;
    icon : string
    name: string; 
  }
const Button: React.FC<ButtonProps> = (props:ButtonProps) => {
    return (
        <div className="absolute top-[19px] left-[848px] rounded flex flex-row items-start justify-start text-grey-grey-600 border-[1px] border-solid border-grey-grey-100">
            <div className="shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg overflow-hidden flex flex-row items-center justify-center py-2.5 px-4 gap-[8px]">
            <img
                className="w-5 relative h-5 overflow-hidden shrink-0"
                alt=""
                src={props.icon}
            />
            <button onClick={props.onClick} className="relative leading-[20px] font-medium">{props.name}</button>
            </div>
      </div>
    );
  };


export default function ProductTable() {
  return (

    <div className="absolute top-[332px] left-[312px] rounded-lg bg-white w-[1096px] h-[606px] text-sm text-grey-grey-700">
        <div className="absolute top-[19px] left-[962px] rounded flex flex-row items-start justify-start text-grey-grey-600 border-[1px] border-solid border-grey-grey-100">
          <div className="shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg overflow-hidden flex flex-row items-center justify-center py-2.5 px-4">
            <div className="relative leading-[20px] font-medium">
              Download all
            </div>
          </div>
        </div>
        <Button icon={filter} name='Filters' onClick={()=>console.log( "Filters clicked !")}/>
        <div className="absolute top-[81px] left-[17px] leading-[20px] font-medium text-grey-grey-500">
          Products
        </div>
        <div className="absolute top-[81px] left-[219px] leading-[20px] font-medium text-grey-grey-500">
          Buying Price
        </div>
        <div className="absolute top-[81px] left-[416px] leading-[20px] font-medium text-grey-grey-500">
          Quantity
        </div>
        <div className="absolute top-[178px] left-[983px] leading-[20px] font-medium text-error-error-600">
          Out of stock
        </div>
        <div className="absolute top-[225px] left-[983px] leading-[20px] font-medium text-success-success-600">
          In- stock
        </div>
        <div className="absolute top-[274px] left-[983px] leading-[20px] font-medium text-error-error-600">
          Out of stock
        </div>
        <div className="absolute top-[322px] left-[983px] leading-[20px] font-medium text-success-success-600">
          In- stock
        </div>
        <div className="absolute top-[370px] left-[983px] leading-[20px] font-medium text-success-success-600">
          In- stock
        </div>
        <div className="absolute top-[418px] left-[983px] leading-[20px] font-medium text-error-error-600">
          Out of stock
        </div>
        <div className="absolute top-[466px] left-[983px] leading-[20px] font-medium text-success-success-600">
          In- stock
        </div>
        <div className="absolute top-[514px] left-[983px] leading-[20px] font-medium text-peru whitespace-pre-wrap">
          Low stock
        </div>
        <div className="absolute top-[178px] left-[17px] leading-[20px] font-medium">
          Bru
        </div>
        <div className="absolute top-[178px] left-[219px] leading-[20px] font-medium">
          ₹257
        </div>
        <div className="absolute top-[178px] left-[807px] leading-[20px] font-medium">
          21/12/22
        </div>
        <div className="absolute top-[178px] left-[594px] leading-[20px] font-medium">
          12 Packets
        </div>
        <div className="absolute top-[178px] left-[415px] leading-[20px] font-medium">
          22 Packets
        </div>
        <div className="absolute top-[225px] left-[17px] leading-[20px] font-medium">
          Red Bull
        </div>
        <div className="absolute top-[225px] left-[218px] leading-[20px] font-medium">
          ₹405
        </div>
        <div className="absolute top-[225px] left-[807px] leading-[20px] font-medium">
          5/12/22
        </div>
        <div className="absolute top-[225px] left-[598px] leading-[20px] font-medium">
          9 Packets
        </div>
        <div className="absolute top-[225px] left-[414px] leading-[20px] font-medium">
          36 Packets
        </div>
        <div className="absolute top-[274px] left-[17px] leading-[20px] font-medium">
          Bourn Vita
        </div>
        <div className="absolute top-[274px] left-[218px] leading-[20px] font-medium">
          ₹502
        </div>
        <div className="absolute top-[274px] left-[807px] leading-[20px] font-medium">
          8/12/22
        </div>
        <div className="absolute top-[274px] left-[598px] leading-[20px] font-medium">
          6 Packets
        </div>
        <div className="absolute top-[274px] left-[416px] leading-[20px] font-medium">
          14 Packets
        </div>
        <div className="absolute top-[322px] left-[17px] leading-[20px] font-medium">
          Horlicks
        </div>
        <div className="absolute top-[322px] left-[218px] leading-[20px] font-medium">
          ₹530
        </div>
        <div className="absolute top-[322px] left-[807px] leading-[20px] font-medium">
          9/1/23
        </div>
        <div className="absolute top-[322px] left-[598px] leading-[20px] font-medium">
          5 Packets
        </div>
        <div className="absolute top-[322px] left-[420px] leading-[20px] font-medium">
          5 Packets
        </div>
        <div className="absolute top-[370px] left-[17px] leading-[20px] font-medium">
          Harpic
        </div>
        <div className="absolute top-[370px] left-[218px] leading-[20px] font-medium">
          ₹605
        </div>
        <div className="absolute top-[370px] left-[807px] leading-[20px] font-medium">
          9/1/23
        </div>
        <div className="absolute top-[370px] left-[598px] leading-[20px] font-medium">
          5 Packets
        </div>
        <div className="absolute top-[370px] left-[416px] leading-[20px] font-medium">
          10 Packets
        </div>
        <div className="absolute top-[418px] left-[17px] leading-[20px] font-medium">
          Ariel
        </div>
        <div className="absolute top-[418px] left-[218px] leading-[20px] font-medium">
          ₹408
        </div>
        <div className="absolute top-[418px] left-[807px] leading-[20px] font-medium">
          15/12/23
        </div>
        <div className="absolute top-[418px] left-[599px] leading-[20px] font-medium">
          7 Packets
        </div>
        <div className="absolute top-[418px] left-[415px] leading-[20px] font-medium">
          23 Packets
        </div>
        <div className="absolute top-[466px] left-[17px] leading-[20px] font-medium">
          Scotch Brite
        </div>
        <div className="absolute top-[466px] left-[218px] leading-[20px] font-medium">
          ₹359
        </div>
        <div className="absolute top-[466px] left-[807px] leading-[20px] font-medium">
          6/6/23
        </div>
        <div className="absolute top-[466px] left-[598px] leading-[20px] font-medium">
          8 Packets
        </div>
        <div className="absolute top-[466px] left-[414px] leading-[20px] font-medium">
          43 Packets
        </div>
        <div className="absolute top-[514px] left-[17px] leading-[20px] font-medium">
          Coca cola
        </div>
        <div className="absolute top-[514px] left-[218px] leading-[20px] font-medium">
          ₹205
        </div>
        <div className="absolute top-[514px] left-[807px] leading-[20px] font-medium">
          11/11/22
        </div>
        <div className="absolute top-[514px] left-[594px] leading-[20px] font-medium">
          10 Packets
        </div>
        <div className="absolute top-[514px] left-[416px] leading-[20px] font-medium">
          41 Packets
        </div>
        <div className="absolute top-[81px] left-[594px] leading-[20px] font-medium text-grey-grey-500">
          Threshold Value
        </div>
        <div className="absolute top-[81px] left-[807px] leading-[20px] font-medium text-grey-grey-500">
          Expiry Date
        </div>
        <div className="absolute top-[81px] left-[983px] leading-[20px] font-medium text-grey-grey-500">
          Availability
        </div>
        <img
          className="absolute top-[116px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[164px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[212px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[260px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[308px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[356px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[404px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[452px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <img
          className="absolute top-[500px] left-[0px] max-h-full w-[1096px]"
          alt=""
          src="/vector-40.svg"
        />
        <div className="absolute top-[28px] left-[16px] text-xl leading-[30px] font-medium text-grey-grey-800">
          Products
        </div>
        <div className="absolute top-[130px] left-[17px] leading-[20px] font-medium">
          Maggi
        </div>
        <div className="absolute top-[130px] left-[218px] leading-[20px] font-medium">
          ₹430
        </div>
        <div className="absolute top-[130px] left-[414px] leading-[20px] font-medium">
          43 Packets
        </div>
        <div className="absolute top-[130px] left-[594px] leading-[20px] font-medium">
          12 Packets
        </div>
        <div className="absolute top-[130px] left-[807px] leading-[20px] font-medium">
          11/12/22
        </div>
        <div className="absolute top-[130px] left-[983px] leading-[20px] font-medium text-success-success-600">
          In- stock
        </div>
        <div className="absolute top-[19px] left-[720px] rounded bg-primary-primary-600 w-[115px] flex flex-row items-center justify-center py-2.5 px-4 box-border text-white">
          <div className="relative leading-[20px] font-medium">Add Product</div>
        </div>
        <div className="absolute top-[556px] left-[1014px] shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded bg-white overflow-hidden flex flex-row items-center justify-center py-[9px] px-[17px] border-[1px] border-solid border-grey-grey-100">
          <div className="relative leading-[20px] font-medium">Next</div>
        </div>
        <div className="absolute top-[565px] left-[503px] leading-[20px]">
          <span>{`Page `}</span>
          <span className="font-medium">1</span>
          <span>{` of `}</span>
          <span className="font-medium">10</span>
        </div>
        <div className="absolute top-[556px] left-[17px] shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded bg-white overflow-hidden flex flex-row items-center justify-center py-[9px] px-[17px] border-[1px] border-solid border-grey-grey-100">
          <div className="relative leading-[20px] font-medium">Previous</div>
        </div>
      </div>
  )
}