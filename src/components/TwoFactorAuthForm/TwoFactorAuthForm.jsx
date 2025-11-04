import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Input, Button, Flex } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './two-factor-auth-form.css';
import Logo from "../../UI/Logo/Logo";

const { Text } = Typography;

const TwoFactorAuthForm = (props) => {
    const [formCode, setformCode] = useState('');
    const [isTimesUp, setIsTimesUp] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(true);

    useEffect(() => {
        if (isFormFilled) {
            setIsTimesUp(false);
            return;
        }

        const timeOut = setTimeout(() => {
            setIsTimesUp(true);
        }, 3000);
        
        return () => clearTimeout(timeOut);
    }, [isFormFilled]);

    useEffect(() => {
        const filled = formCode.length === 6;
        setIsFormFilled(filled);
        
        if (filled) {
            setIsTimesUp(false);
        }
    }, [formCode])

    function getNewCode(){
        setIsTimesUp(false);
        setTimeout(() => setIsTimesUp(true), 3000);
    }
    
    function handleClickBack(){
        props.setIsPrimaryLogin(false);
    }

    const onInput = (value) => {
        setformCode(value);
        setIsFormInvalid(true);
    };

    const sharedProps = {
        onInput,
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(formCode.join(''))
        formCode.join('') !== '111111' ? setIsFormInvalid(false) : setIsFormInvalid(true)
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
            <Text className="form-description">Enter the 6-digit code from the Google Authenticator app</Text>
            <form className="form">
                <Flex vertical gap="middle" style={{ width: '100%' }}>
                    <div className="input-groupe">
                        <Input.OTP type="number" className="form__otp-input" status={!isFormInvalid ? 'error' : ''} {...sharedProps}/>
                        {!isFormInvalid ? <Text type="danger" className="input-invalid">Invalid code</Text> : <div></div>}
                    </div>
                    {isTimesUp
                        ? <Button size='large' type="primary" onClick={() => getNewCode()}>
                            Get new
                        </Button>
                        : <></>
                    }
                    {isFormFilled
                        ? <Button size='large' type="primary" disabled={!isFormInvalid} onClick={(e) => handleSubmit(e)}>
                            Continue
                        </Button>
                        : <></>
                    }
                </Flex>
            </form>
        </>
    )
}

export default TwoFactorAuthForm;