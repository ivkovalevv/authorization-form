import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Typography } from "antd";
import { Input, Button, Flex } from "antd";
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import './two-factor-auth-form.css';
import Logo from "../../UI/Logo/Logo";
import { useVerify2FA } from "../../hooks/useAuth";
import { Context } from "../../main";

const { Text } = Typography;
const CODE_LENGTH = 6;
const TIMEOUT_DURATION = 10_000;

const TwoFactorAuthForm = ({ setIsPrimaryLogin, setUserData }) => {
    const { user } = useContext(Context);
    const [formCode, setformCode] = useState([]);
    const [isTimesUp, setIsTimesUp] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState('');

    const formCodeRef = useRef();
    const verify2FAMutation = useVerify2FA();

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
        formCodeRef.current = formCode;
        const filled = formCode.join('').trim().length === CODE_LENGTH;
        setIsFormFilled(filled);
        
        if (filled) {
            setIsTimesUp(false);
        }
    }, [formCode])

    function getNewCode(){
        setIsTimesUp(false);
        setformCode([]);
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
        setIsFormInvalid('');
    };

    const sharedProps = {
        onInput,
    };

    function handleSubmit(){
       const code = formCode.join('').trim();

       verify2FAMutation.mutate({code, email: user.email}, {
            onSuccess: (data) => {
                setUserData(data.user);
                user.setId(data.user.id);
                user.setName(data.user.name);
            },
            onError: (error) => {
                setIsFormInvalid(error.message);
            }
       })
    };

    const getErrorMessage = (error) => {
        if (!error) return null;
        
        const status = error.status;
        
        switch (status) {
            case 400:
                return "Invalid confirmation code. Please try again.";
            case 503:
                return "The two-factor authentication service is temporarily unavailable.";
            case 0:
                return "Problems with the Internet connection. Check your internet connection.";
            default:
                return error.message || "Code verification error. Please try again.";
        }
    };

    return (
        <>
            <div className="button-back">
                <Button size='large' type="text" onClick={handleClickBack} disabled={verify2FAMutation.isPending}>
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

            {verify2FAMutation.isError && (
                <Alert
                    message="Code verification error"
                    description={getErrorMessage(verify2FAMutation.error)}
                    type="error"
                    showIcon
                    closable
                    className="alert"
                />
            )}

            <form className="form">
                <Flex vertical gap="middle" style={{ width: '100%' }}>
                    <div className="input-groupe">
                        <Input.OTP 
                            value={formCode.join('').trim()} 
                            length={CODE_LENGTH} 
                            type="number" 
                            className="form__otp-input" 
                            status={isFormInvalid ? 'error' : ''} 
                            disabled={verify2FAMutation.isPending}
                            {...sharedProps}/>
                        {isFormInvalid && (
                            <Text type="danger" className="input-invalid">
                                {isFormInvalid}
                            </Text>
                        )}
                    </div>
                    {isTimesUp && (
                        <Button size='large' type="primary" onClick={getNewCode}>
                            Get new
                        </Button>
                    )}
                    {isFormFilled && (
                        <Button size='large' type="primary" disabled={isFormInvalid || verify2FAMutation.isPending} onClick={handleSubmit}>
                            {verify2FAMutation.isPending ? <LoadingOutlined className="loading-icon"/> : 'Continue'}
                        </Button>
                    )}
                </Flex>
            </form>
        </>
    )
}

export default TwoFactorAuthForm;