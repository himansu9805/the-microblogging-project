import '../../commons/base.styles.scss';
import {Navbar} from "../../components/navbar";
import {Footer} from "../../components/footer";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div className={"body"}>
            <div className={"background-image"}></div>
            <Navbar />
            <div className={"container-row"}>
                <div className={"column"}>
                    <h1>Languages are the <strong>most powerful</strong> invention of <u>mankind</u>.</h1>
                    <h1>Express your <strong>views and opinion</strong> on this <u>platform</u> with others.</h1>
                </div>
                <div className="column">
                    <div className={"sign-up"}>
                        <div className={"heading"}>LOGIN TO CONTINUE WITH OUR PLATFORM</div>
                        <input className={"input-field"} type={"email"} placeholder={"Enter your email address"} name={"email"} />
                        <input className={"input-field"} type={"password"} placeholder={"Enter your password"} name={"password"} />
                        <input className={"sign-up-button"} type={"button"} name={"log-up"} value={"LOGIN"} />
                        <div className={"container-col"}>
                            <div className={"text"}>Don't have an account?</div>
                            <Link to={"/signup"} className={"link"}>Sign Up here</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}