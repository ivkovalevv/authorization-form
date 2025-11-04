import './logo.css';
import { Typography } from "antd";

const { Text } = Typography;

const Logo = () => {
    return <div className='logo-wrapper'>
        <div className='logo-circle'></div>
        <Text className='logo-text' strong>Company</Text>
    </div>
}

export default Logo;