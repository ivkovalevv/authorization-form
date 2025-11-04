import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Input, Button, Flex } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login-form.css";
import Logo from "../../UI/Logo/Logo";

const { Text } = Typography;

const LoginForm = (props) => {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if(Object.values(formData).every(value => value.trim() !== '')){
            setIsFormFilled(true);
        } else if(Object.values(formData).some(value => value === '')){
            setIsFormFilled(false);
        }
    }, [formData])

    function handleChange(e){
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        props.setIsPrimaryLogin(true);
    }

    return (
        <>
            <div className="form-logo-wrapper">
            <Logo/>
        </div>
        <Text strong className="form-heading">Sign in to your account to continue</Text>
        <form className="form">
            <Flex vertical gap="middle" style={{ width: '100%' }}>
                <Input 
                    name="email"
                    size="default" 
                    placeholder="Email" 
                    prefix={<UserOutlined className="input-icon" />} 
                    value={formData.email} 
                    onChange={(e) => handleChange(e)}/>
                <Input.Password
                    name="password"
                    visibilityToggle={false} 
                    size="default" 
                    placeholder="Password" 
                    prefix={<LockOutlined className="input-icon"/>} 
                    value={formData.password}
                    onChange={(e) => handleChange(e)}/>
                    <Button size='large' type="primary" disabled={!isFormFilled} onClick={handleSubmit}>
                        Log in
                    </Button>
            </Flex>
        </form>
        </>
    )
}

export default LoginForm;