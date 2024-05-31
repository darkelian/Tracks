import SignUpAdmin from "../../components/manager/SignUpAdmin";
import Header from "../../components/client/Header";
import PasswordChange from '../../components/general/PasswordChange';


const PassChangeClient = () => {
    return (
        <section>
            <Header/>
            <div className="h-screen">
                <div className="flex items-center justify-center h-screen">
                    <PasswordChange />
                </div>
            </div>
        </section>
    )
}

export default PassChangeClient