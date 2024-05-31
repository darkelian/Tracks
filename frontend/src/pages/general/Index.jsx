import { useState } from "react";
import Slider from 'react-slick';
import { Tweet } from "react-tweet";

import Header from '../../components/general/Header.jsx';
import ImageCarousel from "../../components/general/ImageCarousel.jsx";
import ImageCarousel2 from "../../components/general/ImageCarousel2.jsx";

import pasoapaso from '../../assets/pasoapaso.png';
import quienessomos from '../../assets/quienessomos.png';
import facebook from '../../assets/facebook.png';
import ig from '../../assets/instagram.png';
import x from '../../assets/X.png';


const NextArrow = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <svg
        className="w-12 h-12 text-white bg-transparent rounded-full hover:bg-gray-500 hover:text-white transition duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M6.293 14.707a1 1 0 010-1.414L10.586 10 6.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <svg
        className="w-12 h-12 text-white bg-transparent rounded-full hover:bg-gray-500 hover:text-white transition duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M13.707 14.707a1 1 0 010-1.414L9.414 10l4.293-4.293a1 1 0 10-1.414-1.414l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

const Index = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "10px"
  };

  const [faqs, setFaqs] = useState([
    { question: "¿Qué es Fourparks?", answer: "Fourparks es un sitio web que ofrece el servicio de reservar tus parqueaderos.", isOpen: false },
    { question: "¿Cómo usar Fourparks?", answer: "Puedes registrarte, buscar parqueaderos disponibles y realizar una reserva fácilmente.", isOpen: false },
    { question: "¿Cómo puedo cancelar una reserva?", answer: "Puedes cancelar una reserva a través de tu cuenta en el sitio web. Ve a Mis Reservas, posteriormente das click en el boton de cancelar en la reserva pertinente.", isOpen: false },
    { question: "¿Qué debo hacer si tengo problemas al realizar una reserva?", answer: "Si encuentras algún problema al realizar una reserva, puedes contactarnos a través del número de atención al cliente.", isOpen: false },
    { question: "¿Hay algún costo adicional por usar el servicio?", answer: "No, el uso del servicio de Fourparks es completamente gratuito. Solo pagarás por las horas de parqueo que reserves.", isOpen: false },
    { question: "¿Qué debo hacer si olvidé mi contraseña?", answer: "Puedes restablecer tu contraseña haciendo clic en ¿Olvidaste tu contraseña? en la página de inicio de sesión y siguiendo las instrucciones.", isOpen: false },
    { question: "¿Cómo puedo contactarlos si tengo más preguntas?", answer: "Puedes contactarnos a través del número de atención al cliente que aparece abajo o enviarnos un correo electrónico a fourparksoficial@gmail.com.", isOpen: false },
  ]);

  const toggleAnswer = (index) => {
    setFaqs(prevFaqs => {
      return prevFaqs.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : false
      }));
    });
  };

  return (
    <>
      <Header />
      <div className="absolute inset-x-0 -top-4 h-8 bg-red-light mt-36" ></div>
      <section className="px-14 pt-40 text-center" >
        <div className="text-9xl">
          <span className="font-bold text-blue-dark">¡</span>
          <span className="font-bold text-red-light">Descubre</span>
          <span className="font-medium text-black"> la </span>
          <span className="font-bold text-blue-dark">nueva</span>
          <span className="font-medium text-black"> forma de</span>
          <span className="font-bold text-red-light"> parquear</span>
          <span className="font-medium text-black"> tu</span>
          <span className="font-bold text-blue-dark"> vehículo</span>
          <span className="font-bold text-blue-dark">!</span>
        </div>
        <div className="mt-5 text-lg text-gray-600">
          ¡Reserva tu espacio de estacionamiento con nosotros hoy mismo!
        </div>

        <div className="absolute inset-x-0 bottom-96 h-8 bg-red-light"></div>
      </section>

      <section id="quienes-somos" className="px-14 pt-40 pb-20 flex justify-between">
        <div className="w-1/2 h-full">
          <ImageCarousel />
        </div>
        <div className="bg-white h-auto w-1/2 ml-10 mr-10 p-5 rounded-lg shadow-lg flex flex-col justify-center">
          <Slider {...settings} autoplay={true} autoplaySpeed={10000}>
            <div className="text-red-light font-bold text-4xl flex mt-5 px-20 text-center">
              ¿Quiénes somos?
              <img src={quienessomos} alt="¿Quiénes somos?" className="flex-center w-32 h-32 ml-36 mt-5" />
            </div>
            <div className="text-red-light font-medium text-xl flex justify-center text-center mt-5 px-5">
              Fourparks es una plataforma en línea que ofrece un servicio integral de reserva de parqueaderos en diversas ubicaciones. Nos dedicamos a simplificar y agilizar el proceso de encontrar y reservar espacios de estacionamiento para nuestros usuarios.
            </div>
            <div className="text-red-light font-medium text-xl flex justify-center text-center mt-5 px-5">
              Nuestra plataforma es fácil de usar y accesible para todos. En menos de 5 minutos, podrás asegurar un cupo en el parqueadero que necesitas, sin complicaciones ni demoras.
            </div>
            <div className="text-red-light font-medium text-xl flex justify-center text-center mt-5 px-5">
              Con nuestra interfaz intuitiva y amigable, encontrar y reservar tu parqueadero ideal es rápido y sencillo. Te ofrecemos una amplia variedad de opciones y funcionalidades que te permiten personalizar tu experiencia de reserva según tus necesidades y preferencias.
            </div>
          </Slider>
        </div>
      </section>


      <section className="px-14 mb-20 text-center relative">
        <div className="text-8xl">
          <span className="font-bold text-blue-dark">¡Fácil</span>
          <span className="font-medium text-black">, </span>
          <span className="font-bold text-red-light">rápido</span>
          <span className="font-medium text-black"> y </span>
          <span className="font-bold text-red-light">seguro!</span>
        </div>
        <div className="mt-5 mb-5 text-lg text-gray-600">
          ¡En menos de 5 minutos tendrás tu reserva hecha!
        </div>
       
      </section>

      <section id="paso-a-paso" className="px-14 flex justify-between">
        <div className="bg-white h-auto w-1/2 mr-10 p-5 rounded-lg shadow-lg flex flex-col justify-center">
          <Slider {...settings} autoplay={true} autoplaySpeed={10000}> 
            <div className="text-blue-dark font-bold text-4xl flex mt-5 px-20 text-center">
              Paso a paso
              <img src={pasoapaso} alt="Paso a paso" className="flex-center w-32 h-32 ml-36 mt-5" />
            </div>
            <div className="text-blue-dark font-semibold text-xl flex justify-center text-center mt-5 px-5">
              1) Ingresa en el sitio web
            </div>
            <div className="text-blue-dark font-semibold text-xl flex justify-center text-center mt-5 px-5">
              2) Regístrate
              <a href="/registro" className="text-red-light font-medium text-xl flex justify-center px-5 cursor-pointer hover:text-blue-dark text-center">
                ¡Haz click aquí para hacer tu formulario de registro!
              </a>
              <div className="text-red-light font-medium text-xl flex justify-center text-center px-5">
                ¡También puedes pedirle a un empleado que te registre!
              </div>
            </div>
            <div className="text-blue-dark font-semibold text-xl flex justify-center text-center mt-5 px-5">
              3) Inicia sesión
              <a href="/cliente-inicio" className="text-red-light font-medium text-xl flex justify-center text-center px-5 cursor-pointer hover:text-blue-dark">
                ¡Haz click aquí para iniciar sesión!
              </a>
            </div>
            <div className="text-blue-dark font-semibold text-xl flex justify-center text-center mt-5 px-5">
              4) Realiza tu reserva
              <div className="text-red-light font-medium text-xl flex justify-center text-center px-5">
                ¡Puedes utilizar nuestro mapa interactivo para seleccionar tus parqueaderos cercanos!
              </div>
            </div>
            <div className="text-blue-dark font-semibold text-xl flex justify-center text-center mt-5 px-5">
              5) Revisa tus reservas activas
              <div className="text-red-light font-medium text-xl flex justify-center text-center px-5">
                ¡En la pestaña de "Mis Reservas" puedes ver el estado de tus solicitudes!
              </div>
            </div>
          </Slider>
        </div>
        <div className="w-1/2 mr-5">
          <ImageCarousel2 />
        </div>
      </section>

      <section className="px-14 mt-20 mb-20 text-center relative">
        
        <div className="text-8xl">
          <span className="font-bold text-blue-dark">¡El mejor</span>
          <span className="font-medium text-black"> sistema de </span>
          <span className="font-bold text-red-light">parqueaderos</span>
          <span className="font-medium text-black"> del </span>
          <span className="font-bold text-red-light">mercado!</span>
        </div>
        <div className="mt-5 mb-5 text-lg text-gray-600">
          ¡Descubre las impresiones de nuestros clientes!
        </div>
        
      </section>

      <section id="opiniones" className="px-14 mt-20">
        <div className="text-center text-4xl font-semibold mb-5">
          ¡Opiniones de nuestros usuarios!
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-xl">

            <Slider {...settings} autoplay={true} autoplaySpeed={10000}>
              <div className="w-full">
                <Tweet id="1795928709028868141" />
              </div>
              <div className="w-full">
                <Tweet id="1795942278529245234" />
              </div>
              <div className="w-full">
                <Tweet id="1795929956498698276" />
              </div>

            </Slider>
          </div>
        </div>
      </section>


      <section className="px-14 mt-20 mb-20 text-center relative">
        <div className="text-8xl">
          <span className="font-bold text-blue-dark">¡Soporte</span>
          <span className="font-bold text-red-light"> 24/7!</span>
        </div>
        <div className="mt-5 mb-5 text-lg text-gray-600">
          ¡Tenemos la mejor atención al cliente de todo el país!
        </div>
      </section>


      <section id="preguntas-frecuentes" className="px-12 mt-20">
        <div className="text-center text-4xl font-semibold mb-5">
          Preguntas frecuentes (FAQ)
        </div>
        <div className="w-full px-20">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-1 border-b py-4 bg-white w-full">
              <h2 className="text-lg font-semibold cursor-pointer hover:text-blue-dark text-center" onClick={() => toggleAnswer(index)}>
                {faq.question}
              </h2>
              {faq.isOpen && (
                <p className="text-gray-600 mt-2 text-center">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-14 mt-20 mb-20 text-center relative">
       
        <div className="text-8xl">
          <span className="font-bold text-blue-dark">¿Que</span>
          <span className="font-medium text-black"> esperas para  </span>
          <span className="font-bold text-red-light">Unirte?</span>
        </div>
        <div className="mt-5 mb-5 text-lg text-gray-600 cursor-pointer hover:text-blue-dark">
          <a href="/registro ">¡Haz click aquí para registrarte!</a>
        </div>
      </section>

      <section className="text-white">
        <section className="px-12 mt-20 flex justify-between h-auto bg-red-light" >
          <section className="flex w-3/5 items-center text-lg">
            <div className="mr-8">
              Línea de atención: 12345678 - Bogotá || 56789123 - Colombia
            </div>
            <div className="mr-8">
              Correo electrónico: fourparksoficial@gmail.com
            </div>
            <div className="">
               © FourParksOficial
            </div>
          </section>
          
          <section className="w-1/6">
            <div className="text-center font-semibold mt-1">
              Redes sociales
            </div>

            <div className="text-center">
              _________________
            </div>

            <div className="flex justify-between">
              <a href="/"><img src={facebook} alt="Facebook" className="w-7 h-7" /></a>
              <a href="/"><img src={ig} alt="Instagram" className="w-10 h-10 ml-2" /></a>
              <a href="https://x.com/FourParkOficial"><img src={x} alt="X" className="w-7 h-7 ml-2" /></a>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default Index;
