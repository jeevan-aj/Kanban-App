
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const ErrorPage = () => (
    <div className='flex justify-center items-center min-h-[100vh]'>
  <Result
    title="Oops Page Not Found !"
    extra={
        <Link to={'/'}>
         <Button type="primary" key="console">
        Go Back
      </Button>
        </Link>
     
    }
  />
    </div>

);
export default ErrorPage;