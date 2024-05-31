import { useState, useEffect } from 'react';
import PasswordChange from '../../components/general/PasswordChange';
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

const PasswordChangePage = () => {
  const [width] = useWindowSize();
  const backgroundImage = width <= 414 ? bgImageMobile : bgImagePC;


  return (
    <div className="h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex items-center justify-center h-screen">
            <PasswordChange />
        </div>
    </div>
  );
}

export default PasswordChangePage;
