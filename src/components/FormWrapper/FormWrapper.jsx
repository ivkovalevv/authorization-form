import './form-wrapper.css';
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
import TwoFactorAuthForm from '../TwoFactorAuthForm/TwoFactorAuthForm';
import SuccessComponent from '../SuccessComponent/SuccessComponent';

const FormWrapper = () => {
    const [isPrimaryLogin, setIsPrimaryLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    return <div className="form-wrapper">
        {userData ? (
            <SuccessComponent setIsPrimaryLogin={setIsPrimaryLogin} setUserData={setUserData}></SuccessComponent>
        ) : isPrimaryLogin ? (
                <TwoFactorAuthForm setIsPrimaryLogin={setIsPrimaryLogin} setUserData={setUserData}/>
            ) : (<LoginForm setIsPrimaryLogin={setIsPrimaryLogin}/>)
        }
    </div>
}

export default FormWrapper;