import SignUpClient from "../../components/admin/SignUpClient";
import Header from "../../components/admin/Header";

const SignUpClientAdminPage = () => {
    return (
        <section>
            <Header />
            <div className="h-screen" >
                <div className="flex items-center justify-center h-screen">
                    <SignUpClient />
                </div>
            </div>
        </section>
    )
}

export default SignUpClientAdminPage