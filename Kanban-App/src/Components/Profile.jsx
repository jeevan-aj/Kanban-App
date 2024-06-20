import  { useState } from 'react';
import { Drawer } from 'antd';
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/InitialSlices';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dispatch  = useDispatch()
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSignout = () => {
    dispatch(setCurrentUser(false))
    setOpen(false)
  }
  return (
    <>
      <button onClick={showDrawer}><RxHamburgerMenu /></button>
      <Drawer placement='right' title="User Profile" onClose={onClose} open={open}>
        <button className='bg-blue-500 px-3 py-2 rounded-sm' onClick={handleSignout}>SignOut</button>
      </Drawer>
    </>
  );
};
export default Profile;