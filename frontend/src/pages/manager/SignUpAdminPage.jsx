import SignUpAdmin from "../../components/manager/SignUpAdmin";
import Header from "../../components/manager/Header";


const SignUpAdminPage = () => {
    return (
        <section>
            <Header/>
            <div className="h-screen">
                <div className="flex items-center justify-center h-screen">
                    <SignUpAdmin />
                </div>
            </div>
        </section>
    )
}

export default SignUpAdminPage