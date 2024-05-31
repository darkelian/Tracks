import SignUpAdmin from "../../components/manager/SignUpAdmin";
import Header from "../../components/admin/Header";
import PasswordChange from '../../components/general/PasswordChange';


const PassChangeAdmin = () => {
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

export default PassChangeAdmin