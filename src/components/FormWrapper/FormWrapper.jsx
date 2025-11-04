import { Typography } from "antd";
import './form-wrapper.css';
import Logo from "../../UI/Logo/Logo";
import LoginForm from "../LoginForm/LoginForm";

const { Text } = Typography;

const FormWrapper = () => {

    return <div className="form-wrapper">
        <div className="form-wrapper__logo-wrapper">
            <Logo/>
        </div>
        <Text strong className="form-wrapper__description">Sign in to your account to continue</Text>
        <LoginForm/>
    </div>
}

export default FormWrapper;