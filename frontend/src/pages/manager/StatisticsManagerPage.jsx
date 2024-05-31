import { useState, useEffect, useContext } from "react";
import { ApiContext } from '../../context/ApiContext.jsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import Header from "../../components/manager/Header";
import BarHoursParking from "../../components/manager/graphics/byParking/hours/BarHours";
import PieHoursParking from "../../components/manager/graphics/byParking/hours/PieHours";
import LineHoursParking from "../../components/manager/graphics/byParking/hours/LineHours";
import BarSalesParking from "../../components/manager/graphics/byParking/sales/BarSales";
import PieSalesParking from "../../components/manager/graphics/byParking/sales/PieSales";
import LineSalesParking from "../../components/manager/graphics/byParking/sales/LineSales";
import BarOccupationParking from "../../components/manager/graphics/byParking/occupation/BarOccupation";
import PieOccupationParking from "../../components/manager/graphics/byParking/occupation/PieOccupation";
import LineOccupationParking from "../../components/manager/graphics/byParking/occupation/LineOccupation";
import BarHoursCity from "../../components/manager/graphics/byCity/hours/BarHours";
import PieHoursCity from "../../components/manager/graphics/byCity/hours/PieHours";
import LineHoursCity from "../../components/manager/graphics/byCity/hours/LineHours";
import BarSalesCity from "../../components/manager/graphics/byCity/sales/BarSales";
import PieSalesCity from "../../components/manager/graphics/byCity/sales/PieSales";
import LineSalesCity from "../../components/manager/graphics/byCity/sales/LineSales";
import BarOccupationCity from "../../components/manager/graphics/byCity/occupation/BarOccupation";
import PieOccupationCity from "../../components/manager/graphics/byCity/occupation/PieOccupation";
import LineOccupationCity from "../../components/manager/graphics/byCity/occupation/LineOccupation";
import BarHoursAll from "../../components/manager/graphics/all/hours/BarHours";
import PieHoursAll from "../../components/manager/graphics/all/hours/PieHours";
import LineHoursAll from "../../components/manager/graphics/all/hours/LineHours";
import BarVehiclesCity from "../../components/manager/graphics/byCity/vehicles/BarVehicles";
import PieVehiclesCity from "../../components/manager/graphics/byCity/vehicles/PieVehicles";
import LineVehiclesCity from "../../components/manager/graphics/byCity/vehicles/LineVehicles";
import BarSalesAll from "../../components/manager/graphics/all/sales/BarSales";
import PieSalesAll from "../../components/manager/graphics/all/sales/PieSales";
import LineSalesAll from "../../components/manager/graphics/all/sales/LineSales";
import BarOccupationAll from "../../components/manager/graphics/all/occupation/BarOccupation";
import PieOccupationAll from "../../components/manager/graphics/all/occupation/PieOccupation";
import LineOccupationAll from "../../components/manager/graphics/all/occupation/LineOccupation";

const StatisticsManagerPage = () => {
  const [searchType, setSearchType] = useState('byParking');
  const [cities, setCities] = useState([]);
  const [actualCity, setActualCity] = useState("");
  const [infoType, setInfoType] = useState('hours');
  const [graphicType, setGraphicType] = useState('bars');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageData, setImageData] = useState('');

  const [parkings, setParkings] = useState([]);
  const [actualParking, setActualParking] = useState('');

  const api = useContext(ApiContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token').replace(/"/g, '');

    api.get(`/city/list`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res=>{
      const cityArray = res.data.map(city => (city))
      setCities(cityArray);
    })
    .catch(err=>{
      console.log(err);
    }) 
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token').replace(/"/g, '');
    const urlCity = (actualCity == "" ? "Bogota": actualCity);
    
    api.get(`/parking/city/${urlCity}`, {headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
        const parkingArray = res.data.map(parking => ({
            id: parking.parkingId.idParking,
            name: parking.namePark
        }));

        setParkings(parkingArray);
    })
    .catch(err => {
        console.error(err.response || err);
    });
  }, [actualCity]);

  useEffect(() => {
    setActualParking("");
    setActualCity("");
    setInfoType("hours");
    setGraphicType("bars")
    setStartDate("");
    setEndDate("");
  }, [searchType])
  
  const createHoursGraph = () => {
    if(searchType == "byParking") {
      if(actualParking && infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarHoursParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieHoursParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineHoursParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "byCity") {
      if(actualCity && infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarHoursCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieHoursCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineHoursCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "all") {
      if(infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarHoursAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieHoursAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineHoursAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    }
  }

  const createSalesGraph = () => {
    if(searchType == "byParking") {
      if(actualParking && infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarSalesParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieSalesParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineSalesParking actualParking={actualParking} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "byCity") { 
      if(actualCity && infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarSalesCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieSalesCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineSalesCity actualCity={actualCity} startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "all") {
      if(infoType && graphicType && startDate && endDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarSalesAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieSalesAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineSalesAll startDate={startDate} endDate={endDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    }
  }

  const createOccupationGraph = () => {
    if(searchType == "byParking") {
      if(actualParking && infoType && graphicType && startDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarOccupationParking actualParking={actualParking} startDate={startDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieOccupationParking actualParking={actualParking} startDate={startDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineOccupationParking actualParking={actualParking} startDate={startDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "byCity") { 
      if(actualCity && infoType && graphicType && startDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarOccupationCity actualCity={actualCity} startDate={startDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieOccupationCity actualCity={actualCity} startDate={startDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineOccupationCity actualCity={actualCity} startDate={startDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    } else if(searchType == "all") {
      if(infoType && graphicType && startDate) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarOccupationAll startDate={startDate} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieOccupationAll startDate={startDate} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineOccupationAll startDate={startDate} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    }
  }

  const createVehiclesGraph = () => {
    if(searchType == "byCity") {
      if(infoType && graphicType && actualCity) {
        switch (graphicType) {
          case 'bars':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <BarVehiclesCity actualCity={actualCity} />
                </div>
              </section>
            );
          case 'circle':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <PieVehiclesCity actualCity={actualCity} />
                </div>
              </section>
            );
          case 'lines':
            return (
              <section className="w-10/12 mt-12 mx-auto" id="graph-section">
                <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                  <LineVehiclesCity actualCity={actualCity} />
                </div>
              </section>
            );
          default:
            return null;
        }
      }
    }
  }

  const createButtons = () => {
    if((searchType == 'byParking' && actualParking) || (searchType == 'byCity' && actualCity) || (searchType == 'all')) {
      if(((infoType == 'hours' || infoType == 'sales') && startDate && endDate) || (infoType == 'occupation' && startDate) || (infoType == 'vehicle')) {
        return (
          <section className="mt-8 mr-36 flex justify-end">
              <button onClick={GenPDF} className='shadow-xl px-16 py-3 mr-12 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold'> 
              Generar PDF </button>
              <button onClick={GenExcel} className='shadow-xl px-16 py-3 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold'> 
              Generar Excel </button>
            </section>
        );
      } 
    } 
    
    return null;
  }

  const applyBorders = (cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  };

  const GenPDF = () => {
    const doc = new jsPDF();
    const graphSection = document.getElementById('graph-section');

    let tipoTemporal = '';
    let descripcionGrafica = '';

    if(searchType == 'byParking') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle por parqueadero";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en el parqueadero ${actualParking.name}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos del parqueadero.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas por parqueadero";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en el parqueadero ${actualParking.name} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación por parqueadero";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos del parqueadero ${actualParking.name} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas el parqueadero tiene mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      }
    } else if(searchType == 'byCity') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle por ciudad";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en todos los parqueaderos de ${actualCity}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos de los parqueaderos de esta ciudad.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas por ciudad";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en todos los parqueaderos de ${actualCity} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación por ciudad";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos de todos los parqueaderos de ${actualCity} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas estos parqueaderos tienen mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      } else if(infoType === "vehicle") {
        tipoTemporal = "Porcentaje de ocupación de cada tipo de vehículo";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje ocupación tiene cada tipo de vehículo en todos los parqueaderos de ${actualCity}. La gráfica nos permite comprender para qué tipo de vehiculos se hacen más reservas en esta ciudad, y de esa manera poder plantaer las estrategias que sean necesarias para gestionar el espacio disponible.`;
      }
    } else if(searchType == 'all') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en todos los parqueaderos disponibles. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos de todos los parqueaderos.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en todos los parqueaderos disponibles durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos de todos los parqueaderos disponibles estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas estos parqueaderos tienen mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      }
    }

    let tamañoYTemp = 90;
    if (graphicType === "circle") {
      tamañoYTemp = 180;
    }

    html2canvas(graphSection).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      doc.text("Estadísticas", 95, 20, { align: "center" });
      if(searchType == "byParking") {
        doc.text(`Nombre del parqueadero: ${actualParking.name}`, 20, 30);
      }
      if(searchType == "byCity") {
        doc.text(`Ciudad: ${actualCity}`, 20, 30);
      }
      doc.text(`Tipo de Información: ${tipoTemporal}`, 20, 40);
      if(infoType == 'occupation') {
        doc.text(`Fecha: ${startDate}`, 20, 50);
      } else if(infoType == 'hours' || infoType == 'sales') {
        doc.text(`Fecha de Inicio: ${startDate}`, 20, 50);
        doc.text(`Fecha de Fin: ${endDate}`, 20, 60);
      } 

      doc.addImage(imgData, 'PNG', 10, 70, 180, tamañoYTemp);

      doc.text(descripcionGrafica, 20, tamañoYTemp + 80, { maxWidth: 170 });

      doc.save("Estadisticas.pdf");
    });
  };

  const GenExcel = async () => {
    const graphSection = document.getElementById('graph-section');
    const canvas = await html2canvas(graphSection);
    const imgData = canvas.toDataURL('image/png');
    setImageData(imgData);
    setTimeout(() => {
      console.log("3 Segundos esperado")
    }, 3000);
    let tipoTemporal = '';
    let descripcionGrafica = '';

    if(searchType == 'byParking') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle por parqueadero";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en el parqueadero ${actualParking.name}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos del parqueadero.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas por parqueadero";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en el parqueadero ${actualParking.name} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación por parqueadero";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos del parqueadero ${actualParking.name} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas el parqueadero tiene mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      }
    } else if(searchType == 'byCity') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle por ciudad";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en todos los parqueaderos de ${actualCity}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos de los parqueaderos de esta ciudad.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas por ciudad";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en todos los parqueaderos de ${actualCity} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación por ciudad";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos de todos los parqueaderos de ${actualCity} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas estos parqueaderos tienen mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      } else if(infoType === "vehicle") {
        tipoTemporal = "Porcentaje de ocupación de cada tipo de vehículo";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje ocupación tiene cada tipo de vehículo en todos los parqueaderos de ${actualCity}. La gráfica nos permite comprender para qué tipo de vehiculos se hacen más reservas en esta ciudad, y de esa manera poder plantaer las estrategias que sean necesarias para gestionar el espacio disponible.`;
      }
    } else if(searchType == 'all') {
      if(infoType === "hours") {
        tipoTemporal = "Horas pico / valle de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en todos los parqueaderos disponibles. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos de todos los parqueaderos.`;
      } else if(infoType === "sales") {
        tipoTemporal = "Ventas de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en todos los parqueaderos disponibles durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
      } else if(infoType === "occupation") {
        tipoTemporal = "Porcentaje de ocupación de todos los parqueaderos";
        descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos de todos los parqueaderos disponibles estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas estos parqueaderos tienen mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
      }
    }

    let tamañoYTemp = 400;
    if (graphicType === "circle") {
      tamañoYTemp = 600;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Estadísticas');

      if (imageData) {
        const imageId = workbook.addImage({
          base64: imageData,
          extension: 'png',
        });

        worksheet.addImage(imageId, {
          tl: { col: 3, row: 1 },
          ext: { width: 600, height: tamañoYTemp },
        });
      }
      
      const titulo = worksheet.getCell('B2');
      const nombrepar = worksheet.getCell('B3');
      const ciudadpar = worksheet.getCell('B3');
      const tipodeinformacion = worksheet.getCell('B4');
      const finicio = worksheet.getCell('B5');
      const ffin = worksheet.getCell('B6');
      const desc = worksheet.getCell("B7");

      applyBorders(worksheet.getCell('B2'));
      applyBorders(worksheet.getCell('B3'));
      applyBorders(worksheet.getCell('B4'));
      applyBorders(worksheet.getCell('B5'));
      applyBorders(worksheet.getCell('B6'));
      applyBorders(worksheet.getCell('B7'));

      titulo.value = new String("Estadisticas:");
      if(searchType == "byParking") {
        nombrepar.value = new String(`Nombre del parqueadero: ${actualParking.name}`);
      }
      if(searchType == "byCity") {
        ciudadpar.value = new String(`Ciudad: ${actualCity}`);
      }
      tipodeinformacion.value = new String(`Tipo de Información: ${tipoTemporal}`);
      if(infoType == 'occupation') {
        finicio.value = new String(`Fecha: ${startDate}`);
      } else if(infoType == 'hours' || infoType == 'sales') {
        finicio.value = new String(`Fecha de Inicio: ${startDate}`);
        ffin.value = new String(`Fecha de Inicio: ${endDate}`);
      } 
      desc.value = new String(descripcionGrafica);
      desc.alignment = { wrapText: true };

      worksheet.getColumn('B').width = 85;

      titulo.alignment = { vertical: 'middle', horizontal: 'center' };
      titulo.font = { bold: true };

      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Estadísticas.xlsx';
        a.click();
      });
    } catch (error) {
      console.error('Error al generar el archivo Excel:', error);
    }
  };

  return (
    <>
      <Header />

      <section className='px-12 pt-36 mb-6 bg-gray-light'>
        <section className="flex justify-start w-full">
          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Tipo de búsqueda</label>
            <select id="statistics-searchType" className="p-3 rounded-md bg-white shadow-md font-paragraph" 
            onChange={(e) => setSearchType(e.target.value)}>
              <option value="byParking"> Por parqueadero </option>
              <option value="byCity"> Por ciudad </option>
              <option value="all"> Completa </option>
            </select>
          </div>

          {searchType == 'byParking' ? (
            <div className='flex flex-col w-1/6 mr-16'>
              <label className='text-sm font-title font-semibold mb-4'>Nombre del parqueadero</label>
              <select id="statistics-parkings" className="p-3 rounded-md bg-white shadow-md font-paragraph"
              onChange={(e) => setActualParking({id: e.target.value.split(",")[0], name: e.target.value.split(",")[1]})}>
                <option value=""></option>
                {parkings.map((parking) => (
                  <option key={parking.id} value={[parking.id, parking.name]}> {parking.name} </option>
                ))}
              </select>
            </div>
          ) : (searchType == 'byCity' ? (
            <div className='flex flex-col w-1/6 mr-16'>
              <label className='text-sm font-title font-semibold mb-4'>Ciudad</label>
              <select id="statistics-city" className="p-3 rounded-md bg-white shadow-md font-paragraph" 
              onChange={(e) => setActualCity(e.target.value)}>
                <option value=""></option>
                {cities.map((city, index) => (
                  <option key={index} value={city}> {city} </option>
                ))}
              </select>
            </div>
          ) : null)}

          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Tipo de información</label>
            <select id="statistics-info" value={infoType} className="p-3 rounded-md bg-white shadow-md font-paragraph" 
            onChange={(e) => setInfoType(e.target.value)}>
              <option value="hours"> Horas pico / valle </option>
              <option value="sales"> Ventas </option>
              <option value="occupation"> Porcentaje de ocupación </option>
              {searchType == 'byCity' ? (
                <option value="vehicle"> Ocupación por vehículo </option>
              ) : null}
            </select>
          </div>

          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Tipo de gráfica</label>
            <select id="statistics-graphic" value={graphicType} className="p-3 rounded-md bg-white shadow-md font-paragraph" 
            onChange={(e) => setGraphicType(e.target.value)}>
              <option value="bars"> Barras </option>
              <option value="lines"> Línea </option>
              <option value="circle"> Circular </option>
            </select>
          </div>

          <div className='flex flex-col w-1/6 mr-16'>
            {infoType != 'vehicle' ? (
              <>
                <label className='text-sm font-title font-semibold mb-4'>Fecha inicio</label>
                <input type="date" id="statistics-startDate" value={startDate} className="h-11 p-3 rounded-md bg-white shadow-md font-paragraph" 
                onChange={(e) => setStartDate(e.target.value)}></input>
              </>
            ) : null}
          </div>

          <div className='flex flex-col w-1/6 mr-16'>
            {(infoType != 'occupation' && infoType != 'vehicle') ? (
              <>
                <label className='text-sm font-title font-semibold mb-4'>Fecha fin</label>
                <input type="date" id="statistics-endDate" value={endDate} className="p-3 rounded-md bg-white shadow-md font-paragraph" 
                onChange={(e) => setEndDate(e.target.value)}></input>
              </>
            ) : null}
          </div>
        </section>

        {infoType == 'hours' ? createHoursGraph() : (infoType == 'sales' ? createSalesGraph() : (infoType == 'occupation' ? createOccupationGraph() : createVehiclesGraph()))}
        {createButtons()}
      </section>
    </>
  )
}

export default StatisticsManagerPage
