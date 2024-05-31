import { useEffect } from 'react';
import bgImage from '../../assets/BG-PC.jpeg'
import SignUp from '../../components/client/SignUp';

const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover'
};

const SignUpClientPage = () => {
    useEffect(() => {
        sessionStorage.removeItem("userLogged");
        sessionStorage.removeItem("token");
      }, []);

    return (
        <div className="h-screen" style={backgroundStyle}>
            <div className="flex items-center justify-center h-screen">
                <SignUp />
            </div>
        </div>
    )
}

export default SignUpClientPage