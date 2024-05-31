import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const PieSales = ({startDate, endDate}) => {
    const [sales, setSales] = useState([]);
    const api = useContext(ApiContext);

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        setSales([]);
      
        api.get(`/statistics/all-sales`, {params: {
            initialDate: startDate,
            finalDate: endDate,
        }, headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            const salesData = res.data.map(item => ({ date: item.date, sum: item.sum }));
            setSales(element => [...element, ...salesData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [startDate, endDate]);      

    const labels = sales.map((item) => item.date);
    const sum = sales.map((item) => item.sum);

    const customPastelColors = [
        '#C3E8FA',
        '#B1D4E6',
        '#85D6FF',
        '#B0EBFF',
        '#1A7691', 
        '#95D6F0', 
        '#76AFCC',
        '#AEE0EB', 
        '#99C8E0', 
        '#ADD9E8', 
        '#96E0ED', 
        '#48AADB', 
        '#7EBEDE',
        '#2d6a88', 
        '#77BBDB',
        '#7DBED4',
        '#448EB3',
        '#C0DDEB',
        '#A2CADE',
        '#1A4B63', 
        '#4C839E',
        '#87B3C9',
        '#5D94B0',
        '#205d7b' 
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Ventas',
            data: sum,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'CANTIDAD DE VENTAS POR DÍA EN TODOS LOS PARQUEADEROS',
            },
        }
    };

    return <Pie data={data} options={options} />;
};

export default PieSales;