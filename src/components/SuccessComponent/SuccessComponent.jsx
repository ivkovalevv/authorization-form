import { useContext } from "react";
import { Alert, Typography } from "antd";
import { Button } from "antd";
import Logo from "../../UI/Logo/Logo";
import { Context } from "../../main";
import './success-component.css';

const { Text } = Typography;

const SuccessComponent = ({ setIsPrimaryLogin, setUserData }) => {
    const { user } = useContext(Context);
    
    function handleClickExit(){
        setIsPrimaryLogin(false);
        setUserData(null);
        user.setEmail('');
        user.setPassword('');
    }

    return (
        <>
            <Alert
                message="Successful authorization"
                description={'You have successfully logged in!'}
                type="success"
                showIcon
                closable
                className="alert"
            />

            <div className="button-exit">
                <Button size='large' type="text" onClick={handleClickExit}>
                    Exit
                </Button>
            </div>

            <div className="success-logo-wrapper">
                <Logo/>
            </div>

            <Text strong className="success-heading">Congratulations!</Text>

            <Text className="success-description">
                {'Dear '}
                <Text className="success-description--special">{user.name}</Text>
                {', you have successfully logged in!'}
            </Text>
        </>
    )
}

export default SuccessComponent;