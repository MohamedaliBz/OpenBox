import { useQuery } from "react-query";
import { fetchSuppliers } from "../../Model/Services/supplierService";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchProducts } from "../../Model/Services/productService";
import { ApexOptions } from "apexcharts";



interface ChartState {
    series: {
        name: string;
        data: number[];
        color: string;
    }[];
    options: ApexOptions;
}

const initialState: ChartState = {
    series: [],
    options: {
        chart: {
            type: 'area',
            height: 350
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'category',
            categories: [],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    }
};

export default function Charts() {
    const { data: products, isLoading, isError } = useQuery('products', fetchProducts);
    const [state, setState] = useState<ChartState>(initialState);
    useEffect(() => {
        if (products) {
            const categories = products.map(p => p.name);
            const quantityData = products.map(p => p.quantity);
            const thresholdData = products.map(p => p.threshold_value);

            setState(prevState => ({
                ...prevState,
                series: [{
                    name: 'Quantity',
                    data: quantityData,
                    color: '#B6D3FA'
                }, {
                    name: 'Threshold',
                    data: thresholdData,
                    color: '#DBA362'
                }],
                options: {
                    ...prevState.options,
                    xaxis: { ...prevState.options.xaxis, categories }
                }
            }));
        }
    }, [products]);

    const [stat, setStat] = useState({
        series: [
            {
                name: 'Purchase',
                data: [3400, 3000, 3700, 2500, 1200, 3000, 1000, 2500, 3600, 4500, 3200, 3000],
                color: '#799cf8'
            },
            {
                name: 'Sales',
                data: [600, 500, 1010, 2800, 1870, 3050, 3900, 1100, 2900, 1200, 3600, 1980],
                color: '#53d060'
            },
        ],
        options: {
            chart: {
                type: 'area' as const, 
                height: 300
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth' as const
            },
            xaxis: {
                type: 'category' as const, // Ensure xaxis.type is explicitly typed as "category"
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            tooltip: {
                x: {
                    format: 'MM'
                }
            }
        }
    })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;   

  return (
        <div className="flex gap-[1.5rem] ">
            <div className="rounded-lg bg-white p-4">
                <ReactApexChart
                    options={stat.options}
                    series={stat.series}
                    type="bar"
                    height={300}
                    width={700} />
            </div>
            <div className="rounded-lg bg-white p-4">
                <ReactApexChart 
                    options={state.options}
                    series={state.series}
                    type="area"
                    height={300}
                    width={610} />
            </div>
        </div>    
  );
}