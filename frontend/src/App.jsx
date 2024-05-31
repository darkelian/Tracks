import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ApiProvider } from './context/ApiContext';
import HomeClientPage from "./pages/client/HomeClientPage"
import LoginPage from "./pages/general/LoginPage"
import SignUpClientPage from "./pages/client/SignUpClientPage"
import ReservationPage from "./pages/client/ReservationsPage";
import HomeAdminPage from "./pages/admin/HomeAdminPage";
import StatisticsAdminPage from "./pages/admin/StatisticsAdminPage";
import HomeManagerPage from "./pages/manager/HomeManagerPage";
import StatisticsManagerPage from "./pages/manager/StatisticsManagerPage";
import PassChangeClient from "./pages/client/PassChangeClient";
import SignUpClientAdminPage from "./pages/admin/SignUpClientAdminPage";
import SignUpAdminPage from "./pages/manager/SignUpAdminPage";
import ForgotPassPage from "./pages/general/ForgotPassPage";
import Index from "./pages/general/Index";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import PassChangeAdmin from "./pages/admin/PassChangeAdmin";
import PassChangeManager from "./pages/manager/PassChangeManager";
import UnlockPage from "./pages/manager/UnlockPage";
import AuditPage from "./pages/manager/AuditPage";

function App() {
    const [initialCoords, setInitialCoords] = useState([]);
    const options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function geolocalizate() {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted" || result.state === "prompt") {
                        let attempts = 0;
                        const maxAttempts = 5;
                        const minAccuracy = 100; 

                        const getLocationWithRetry = () => {
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    if (position.coords.accuracy <= minAccuracy) {
                                        setInitialCoords([position.coords.latitude, position.coords.longitude]);
                                    } else {
                                        attempts++;
                                        if (attempts < maxAttempts) {
                                            console.log(`Intento ${attempts}: La precisión de la ubicación no es suficiente. Reintentando...`);
                                            setTimeout(getLocationWithRetry, 3000); 
                                        } else {
                                            console.log(`Se han agotado los intentos. No se pudo obtener una precisión aceptable.`);
                                        }
                                    }
                                },
                                errors,
                                options
                            );
                        };

                        getLocationWithRetry();
                    } else if (result.state === "denied") {
                        console.log("La geolocalización está desactivada.");
                    }
                });
        } else {
            console.log("La geolocalización no es compatible con este navegador.");
        }
    }

    useEffect(() => {
        geolocalizate();
    }, []);

  return (
    <ApiProvider>
        <BrowserRouter>
        <Routes>
        
            <Route path="/*" element={<Index />} />
        
            <Route path="/inicio-sesion" element={<LoginPage />} />
            <Route path="/registro" element={<SignUpClientPage />} />
            <Route path="/recuperacion-contraseña" element={<ForgotPassPage />} />

            <Route path="/cliente-inicio" element={<HomeClientPage initialCoords={initialCoords} />}/>
            <Route path="/mis-reservas" element={<ReservationPage />}/>

            <Route path="/admin-inicio" element={<HomeAdminPage />}/>
            <Route path="/admin-ver-estadisticas" element={<StatisticsAdminPage />}/>
            <Route path="/registrar-cliente" element={<SignUpClientAdminPage />} />
            
            <Route path="/manager-inicio" element={<HomeManagerPage initialCoords={initialCoords} />}/>
            <Route path="/manager-ver-estadisticas" element={<StatisticsManagerPage />}/>
            <Route path="/cambio-contraseña" element={<PassChangeClient />} />
            <Route path="/cambio-contraseña-admin" element={<PassChangeAdmin />} />
            <Route path="/cambio-contraseña-manager" element={<PassChangeManager />} />
            <Route path="/desbloquear-administrador" element={<UnlockPage />} />
            <Route path="/auditoria" element={<AuditPage />} />
            <Route path="/agregar-administrador" element={<SignUpAdminPage />} />
        </Routes>
        </BrowserRouter>
    </ApiProvider>
  )
}
export default App
