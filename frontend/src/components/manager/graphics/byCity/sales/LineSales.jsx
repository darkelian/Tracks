import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineSales = ({actualCity, startDate, endDate}) => {
    const [idCity, setIdCity] = useState('');
    const [sales, setSales] = useState([]);
    const api = useContext(ApiContext);

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');

        api.get(`/city/${actualCity}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            setIdCity(res.data.idCity);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [actualCity]);  

    useEffect(() => {
        if(idCity) {
            const token = sessionStorage.getItem('token').replace(/"/g, '');
            setSales([]);
        
            api.get(`/statistics/city-sales`, {params: {
                initialDate: startDate,
                finalDate: endDate,
                city: actualCity
            }, headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                const salesData = res.data.map(item => ({ date: item.date, sum: item.sum }));
                setSales(element => [...element, ...salesData]);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [idCity, startDate, endDate]);  

    const labels = sales.map((item) => item.date);
    const sum = sales.map((item) => item.sum);

    const customPastelColors = [
        '#b1d4e6'
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
                text: `CANTIDAD DE VENTAS POR DÍA EN ${actualCity.toUpperCase()}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineSales;
