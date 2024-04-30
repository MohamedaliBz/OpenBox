import  OverallInventory from './OverallInventory'
import ProductTable from './ProductTable'

type Props = {}

export default function Inventory() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <OverallInventory/>
    </div>

  )
}