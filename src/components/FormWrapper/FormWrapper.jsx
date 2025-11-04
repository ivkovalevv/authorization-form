import './form-wrapper.css';
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
import TwoFactorAuthForm from '../TwoFactorAuthForm/TwoFactorAuthForm';

const FormWrapper = () => {
    const [isPrimaryLogin, setIsPrimaryLogin] = useState(false);

    return <div className="form-wrapper">
        {
            isPrimaryLogin
            ? <TwoFactorAuthForm setIsPrimaryLogin={setIsPrimaryLogin}/>
            : <LoginForm setIsPrimaryLogin={setIsPrimaryLogin}/>
        }
    </div>
}

export default FormWrapper;