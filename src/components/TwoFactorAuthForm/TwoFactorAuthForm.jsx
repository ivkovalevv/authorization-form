import { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import { Input, Button, Flex } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './two-factor-auth-form.css';
import Logo from "../../UI/Logo/Logo";

const { Text } = Typography;
const CODE_LENGTH = 6;
const TIMEOUT_DURATION = 10_000;

const TwoFactorAuthForm = ({ setIsPrimaryLogin }) => {
    const [formCode, setformCode] = useState([]);
    const [isTimesUp, setIsTimesUp] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(true);

    const formCodeRef = useRef();

    useEffect(() => {
        if (isFormFilled) {
            setIsTimesUp(false);
            return;
        }

        const timeOut = setTimeout(() => {
            setIsTimesUp(true);
        }, TIMEOUT_DURATION);
        
        return () => clearTimeout(timeOut);
    }, [isFormFilled]);

    useEffect(() => {
        const filled = formCode.join('').trim().length === CODE_LENGTH;
        setIsFormFilled(filled);
        
        if (filled) {
            setIsTimesUp(false);
        }
    }, [formCode])

    function getNewCode(){
        setIsTimesUp(false);
        setTimeout(() => {
            const currentFilled = formCodeRef.current.join('').trim().length === CODE_LENGTH;
            if (!currentFilled) {
                setIsTimesUp(true);
            }
        }, TIMEOUT_DURATION);
    }
    
    function handleClickBack(){
        setIsPrimaryLogin(false);
    }

    function onInput(value){
        setformCode(value);
        setIsFormInvalid(true);
    };

    const sharedProps = {
        onInput,
    };

    function handleSubmit(){
        const isValid = formCode.join('').trim() === import.meta.env.VITE_VALID_CODE;
        setIsFormInvalid(isValid);
        
        if(isValid){
            console.log('Code is valid!');
        }
    }

    return (
        <>
            <div className="button-back">
                <Button size='large' type="text" onClick={handleClickBack}>
                    <ArrowLeftOutlined className="button-back-icon" />
                </Button>
            </div>

            <div className="form-logo-wrapper">
                <Logo/>
            </div>

            <Text strong className="form-heading">Two-Factor Authentication</Text>

            <Text className="form-description">
                {`Enter the ${CODE_LENGTH}-digit code from the Google Authenticator app`}
            </Text>

            <form className="form">
                <Flex vertical gap="middle" style={{ width: '100%' }}>
                    <div className="input-groupe">
                        <Input.OTP length={CODE_LENGTH} type="number" className="form__otp-input" status={!isFormInvalid ? 'error' : ''} {...sharedProps}/>
                        {!isFormInvalid && (
                            <Text type="danger" className="input-invalid">
                                Invalid code
                            </Text>
                        )}
                    </div>
                    {isTimesUp && (
                        <Button size='large' type="primary" onClick={getNewCode}>
                            Get new
                        </Button>
                    )}
                    {isFormFilled && (
                        <Button size='large' type="primary" disabled={!isFormInvalid} onClick={handleSubmit}>
                            Continue
                        </Button>
                    )}
                </Flex>
            </form>
        </>
    )
}

export default TwoFactorAuthForm;