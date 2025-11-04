import { useEffect, useState } from "react";
import { Input, Button, Flex } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login-form.css";

const LoginForm = () => {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [formData, setFormData] = useState({
        text: '',
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
        [e.target.type]: e.target.value
        });
    };

    return (
        <form className="form">
            <Flex vertical gap="middle" style={{ width: '100%' }}>
                <Input 
                    size="default" 
                    placeholder="Email" 
                    prefix={<UserOutlined className="input-icon" />} 
                    value={formData.text} 
                    onChange={(e) => handleChange(e)}/>
                <Input.Password 
                    visibilityToggle={false} 
                    size="default" 
                    placeholder="Password" 
                    prefix={<LockOutlined className="input-icon"/>} 
                    value={formData.password}
                    onChange={(e) => handleChange(e)}/>
                    <Button size='large' type="primary" disabled={!isFormFilled}>
                        Log in
                    </Button>
            </Flex>
        </form>
    )
}

export default LoginForm;