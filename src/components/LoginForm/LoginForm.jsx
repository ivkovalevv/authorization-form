import { useContext, useEffect, useState } from "react";
import { Typography, Input, Button, Flex } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login-form.css";
import Logo from "../../UI/Logo/Logo";
import { Context } from "../../main";

const { Text } = Typography;

const LoginForm = ({ setIsPrimaryLogin }) => {
    const { user } = useContext(Context);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        password: user.password,
    });

    useEffect(() => {
        if(Object.values(formData).every(value => value.trim() !== '')){
            setIsFormFilled(true);
        } else if(Object.values(formData).some(value => value === '')){
            setIsFormFilled(false);
        }
    }, [formData])

    function handleChange(e){
        const { name, value } = e.target;

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

    function handleSubmit(e){
        e.preventDefault();
        setIsPrimaryLogin(true);
    }

    return (
        <>
        <div className="form-logo-wrapper">
            <Logo/>
        </div>
        <Text strong className="form-heading">Sign in to your account to continue</Text>
        <form className="form" onSubmit={handleSubmit}>
            <Flex vertical gap="middle" style={{ width: '100%' }}>
                <Input 
                    name="email"
                    size="default" 
                    placeholder="Email" 
                    prefix={<UserOutlined className="input-icon" />} 
                    value={formData.email} 
                    onChange={handleChange}/>
                <Input.Password
                    name="password"
                    visibilityToggle={false} 
                    size="default" 
                    placeholder="Password" 
                    prefix={<LockOutlined className="input-icon"/>} 
                    value={formData.password}
                    onChange={handleChange}/>
                    <Button size='large' type="primary" disabled={!isFormFilled} htmlType="submit">
                        Log in
                    </Button>
            </Flex>
        </form>
        </>
    )
}

export default LoginForm;