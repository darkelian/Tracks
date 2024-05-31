import { useState, useEffect } from 'react';
import ForgotPass from '../../components/general/ForgotPass';
import bgImagePC from '../../assets/BG-PC.jpeg';
import bgImageMobile from '../../assets/BG-Mobile.jpeg';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

const ForgotPassPage = () => {
  const [width] = useWindowSize();
  const backgroundImage = width <= 414 ? bgImageMobile : bgImagePC;


  return (
    <div className="h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex items-center justify-center h-screen">
            <ForgotPass />
        </div>
    </div>
  );
}

export default ForgotPassPage;
