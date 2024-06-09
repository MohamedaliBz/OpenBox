import Layout from "../../../Components/Layout";
import Charts from "../../../Components/Dashbord/chart";
import InventorySummary from "../../../Components/Dashbord/summary";
import ProductSummary from "../../../Components/Dashbord/propductSummary";
import StockDistribution from "../../../Components/Dashbord/stockDistibution";

export default function Dashbord() {
  return (
    <Layout>
      <div className="text-lg text-grey-800 flex flex-col justify-center rounded-lg w-[80%] ml-[19rem] mt-[-48rem] p-4">

        <div className="flex gap-[1rem]">
          <div>
            <InventorySummary/>
            <ProductSummary/>
          </div>
          <StockDistribution/>
        </div>
        
        
        <Charts/>
      </div>
    </Layout>
  )
}