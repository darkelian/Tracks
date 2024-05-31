import { useState, useEffect, useContext } from "react";
import { ApiContext } from '../../context/ApiContext.jsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import Header from "../../components/admin/Header";
import BarHours from "../../components/admin/graphics/hours/BarHours";
import PieHours from "../../components/admin/graphics/hours/PieHours";
import LineHours from "../../components/admin/graphics/hours/LineHours";
import BarSales from "../../components/admin/graphics/sales/BarSales";
import PieSales from "../../components/admin/graphics/sales/PieSales";
import LineSales from "../../components/admin/graphics/sales/LineSales";
import BarOccupation from "../../components/admin/graphics/occupation/BarOccupation";
import PieOccupation from "../../components/admin/graphics/occupation/PieOccupation";
import LineOccupation from "../../components/admin/graphics/occupation/LineOccupation";

const StatisticsAdminPage = () => {
  const [infoType, setInfoType] = useState('hours');
  const [graphicType, setGraphicType] = useState('bars');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageData, setImageData] = useState('');

  const [actualParking, setActualParking] = useState({
    id: "",
    name: ""
  });

  const api = useContext(ApiContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token').replace(/"/g, '');
    const user = JSON.parse(sessionStorage.getItem('userLogged'));

    api.get(`/parking/admin/${user.idType}/${user.idNumber}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setActualParking({
          id: res.data.parking.parkingId.idParking,
          name: res.data.parking.namePark
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const createHoursGraph = () => {
    if (actualParking && infoType && graphicType && startDate && endDate) {
      switch (graphicType) {
        case 'bars':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <BarHours actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        case 'circle':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <PieHours actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        case 'lines':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <LineHours actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        default:
          return null;
      }
    }
  }

  const createSalesGraph = () => {
    if (actualParking && infoType && graphicType && startDate && endDate) {
      switch (graphicType) {
        case 'bars':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <BarSales actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        case 'circle':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <PieSales actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        case 'lines':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <LineSales actualParking={actualParking} startDate={startDate} endDate={endDate} />
              </div>
            </section>
          );
        default:
          return null;
      }
    }
  }
  
  const createOccupationGraph = () => {
    if (actualParking && infoType && graphicType && startDate) {
      switch (graphicType) {
        case 'bars':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <BarOccupation actualParking={actualParking} startDate={startDate} />
              </div>
            </section>
          );
        case 'circle':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <PieOccupation actualParking={actualParking} startDate={startDate} />
              </div>
            </section>
          );
        case 'lines':
          return (
            <section className="w-10/12 mt-12 mx-auto" id="graph-section">
              <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
                <LineOccupation actualParking={actualParking} startDate={startDate} />
              </div>
            </section>
          );
        default:
          return null;
      }
    }
  }

  const createButtons = () => {
    if (actualParking && infoType && graphicType && startDate && endDate) {
      return (
        <section className="mt-8 mb-6 mr-36 flex justify-end">
            <button onClick={GenPDF} className='shadow-xl px-16 py-3 mr-12 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold'> 
            Generar PDF </button>
            <button onClick={GenExcel} className='shadow-xl px-16 py-3 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold'> 
            Generar Excel </button>
          </section>
      );
    } else {
      return null;
    }
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
    if (infoType === "hours") {
      tipoTemporal = "Horas pico / valle";
      descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en el parqueadero ${actualParking.name}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos del parqueadero.`;
    } else if (infoType === "sales") {
      tipoTemporal = "Ventas";
      descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en el parqueadero ${actualParking.name} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
    } else if (infoType === "occupation") {
      tipoTemporal = "Porcentaje de ocupación";
      descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos del parqueadero ${actualParking.name} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas el parqueadero tiene mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
    }

    let tamañoYTemp = 90;
    if (graphicType === "circle") {
      tamañoYTemp = 180;
    }

    html2canvas(graphSection).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      doc.text("Estadísticas", 95, 20, { align: "center" });
      doc.text(`Nombre del parqueadero: ${actualParking.name}`, 20, 30);
      doc.text(`Tipo de Información: ${tipoTemporal}`, 20, 40);
      if(infoType == 'occupation') {
        doc.text(`Fecha: ${startDate}`, 20, 50);
      } else {
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
    if (infoType === "hours") {
      tipoTemporal = "Horas pico / valle";
      descripcionGrafica = `Esta gráfica de ${graphicType === 'bars' ? 'barras' : graphicType === 'circle' ? 'circular' : 'líneas'} muestra la distribución de horas pico y horas valle en el parqueadero ${actualParking.name}. El periodo analizado abarca desde ${startDate} hasta ${endDate}. La gráfica permite identificar los momentos de mayor y menor afluencia, ayudando a optimizar la gestión del espacio y los recursos del parqueadero.`;
    } else if (infoType === "sales") {
      tipoTemporal = "Ventas";
      descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra la distribución de ventas en el parqueadero ${actualParking.name} durante el periodo comprendido entre ${startDate} y ${endDate}. La gráfica proporciona una visión clara de las fuentes de ingresos predominantes, facilitando la comprensión de las tendencias de ventas y la toma de decisiones informadas sobre estrategias comerciales.`;
    } else if (infoType === "occupation") {
      tipoTemporal = "Porcentaje de ocupación";
      descripcionGrafica = `Esta gráfica ${graphicType === 'bars' ? 'de barras' : graphicType === 'circle' ? 'circular' : 'de líneas'} ilustra qué porcentaje de cupos del parqueadero ${actualParking.name} estuvieron ocupados durante el día ${startDate}. La gráfica nos permite comprender en qué rango de horas el parqueadero tiene mayor cantidad de espacios reservados y en cuáles menos, y de esa manera poder plantaer las estrategias que sean necesarias para aumentar el número de reservas y gestionar el espacio disponible.`;
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
      nombrepar.value = new String(`Nombre del parqueadero: ${actualParking.name}`);
      tipodeinformacion.value = new String(`Tipo de Información: ${tipoTemporal}`);
      if(infoType == 'occupation') {
        finicio.value = new String(`Fecha: ${startDate}`);
      } else {
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

      <section className='px-12 pt-36 bg-gray-light'>
        <section className="flex justify-start w-full">
          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Nombre del parqueadero</label>
            <div id="statistics-parkings" className="h-11 p-3 rounded-md bg-white shadow-md font-paragraph"> {actualParking.name} </div>
          </div>

          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Tipo de información</label>
            <select id="statistics-info" value={infoType} className="p-3 rounded-md bg-white shadow-md font-paragraph" 
            onChange={(e) => setInfoType(e.target.value)}>
              <option value="hours"> Horas pico / valle </option>
              <option value="sales"> Ventas </option>
              <option value="occupation"> Porcentaje de ocupación </option>
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
            <label className='text-sm font-title font-semibold mb-4'>Fecha inicio</label>
            <input type="date" id="statistics-startDate" value={startDate} className="h-11 p-3 rounded-md bg-white shadow-md font-paragraph" 
            onChange={(e) => setStartDate(e.target.value)}></input>
          </div>

          <div className='flex flex-col w-1/6 mr-16'>
            {infoType != 'occupation' ? (
              <>
                <label className='text-sm font-title font-semibold mb-4'>Fecha fin</label>
                <input type="date" id="statistics-endDate" value={endDate} className="p-3 rounded-md bg-white shadow-md font-paragraph" 
                onChange={(e) => setEndDate(e.target.value)}></input>
              </>
            ) : null}
          </div>
        </section>

        {infoType == 'hours' ? createHoursGraph() : (infoType == 'sales' ? createSalesGraph() : createOccupationGraph())}
        {createButtons()}
      </section>
    </>
  )
}

export default StatisticsAdminPage
