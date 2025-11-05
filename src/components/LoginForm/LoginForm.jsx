import { useContext, useEffect, useState } from "react";
import { Typography, Input, Button, Flex, Alert } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import "./login-form.css";
import Logo from "../../UI/Logo/Logo";
import { Context } from "../../main";
import { useLogin } from "../../hooks/useAuth";

const { Text } = Typography;

const LoginForm = ({ setIsPrimaryLogin }) => {
    const { user } = useContext(Context);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        password: user.password,
    });
    const [isFormInvalid, setIsFormInvalid] = useState('');
    const loginMutation = useLogin();

    useEffect(() => {
        if(Object.values(formData).every(value => value.trim() !== '')){
            setIsFormFilled(true);
        } else if(Object.values(formData).some(value => value === '')){
            setIsFormFilled(false);
        }
    }, [formData])

    function handleChange(e){
        const { name, value } = e.target;
        setIsFormInvalid('');
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));

        if (name === 'email') {
            user.setEmail(value);
        } else if (name === 'password') {
            user.setPassword(value);
        }
    };

    const getErrorMessage = (error) => {
        if (!error) return null;
        const status = error.status;
        switch (status) {
            case 401:
                return "Invalid email or password. Please check the correctness of the entered data.";
            case 500:
                return "Server error. Please try again later.";
            case 0:
                return "Problems with the Internet connection. Check your internet connection.";
            default:
                return error.message || "An unexpected error has occurred.";
        }
    };

    function handleSubmit(e){
        e.preventDefault();

        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                if (data.requires2FA) {
                    setIsPrimaryLogin(true);
                }
            },
            onError: (error) => {
                setIsFormInvalid(getErrorMessage(error));
            },
        })
    }

    

    return (
        <>
        <div className="form-logo-wrapper">
            <Logo/>
        </div>
        <Text strong className="form-heading">Sign in to your account to continue</Text>

        {loginMutation.isError && (
            <Alert
                message="Login error"
                description={getErrorMessage(loginMutation.error)}
                type="error"
                showIcon
                closable
                className="alert"
            />
        )}

        <form className="form" onSubmit={handleSubmit}>
            <Flex vertical gap="middle" style={{ width: '100%' }}>
                <Input 
                    name="email"
                    size="default" 
                    placeholder="Email" 
                    prefix={<UserOutlined className="input-icon" />} 
                    value={formData.email}
                    status={isFormInvalid && 'error'}
                    disabled={loginMutation.isPending}  
                    onChange={handleChange}/>
                <div className="input-groupe">
                    <Input.Password
                        name="password"
                        visibilityToggle={false} 
                        size="default" 
                        placeholder="Password" 
                        prefix={<LockOutlined className="input-icon"/>} 
                        value={formData.password}
                        status={isFormInvalid && 'error'} 
                        disabled={loginMutation.isPending}
                        onChange={handleChange}/>
                    {isFormInvalid && (
                        <Text type="danger" className="input-invalid">
                            {isFormInvalid}
                        </Text>
                    )}
                </div>
                <Button size='large' type="primary" disabled={!isFormFilled || loginMutation.isPending} htmlType="submit">
                    {loginMutation.isPending ? <LoadingOutlined className="loading-icon"/> : 'Log in'}
                </Button>
            </Flex>
        </form>
        </>
    )
}

export default LoginForm;