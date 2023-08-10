import '../../Css/Header.css'
import { useHistory } from 'react-router-dom';
import { Affix, Avatar, Menu, Button } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, LoginOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { react, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2'




function Nav({ user, notification }) {
  const history = useHistory();
  const [current, setCurrent] = useState('mail');


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem("user");
      notification('success', 'Logged out successfully !')
      history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmNotification = (e) => {
    e.preventDefault()
    return Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to sign out?",
      icon: 'warning',
      width: '32em',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        return handleLogout();
      }
    })
  }

  const items = [
    {
      label: 'HOME',
      key: '',
      icon: <HomeOutlined />,
    },
    {
      label: 'CART',
      key: 'cart',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: 'Mobile',
      key: 'mobile',
      icon: <InfoCircleOutlined />,
    },
    !user ?
      {
        label: 'Login/Signup',
        key: 'login',
        icon: <LoginOutlined />,
      } : '',
    user ?
      {
        label:
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              user?.avt ? <Avatar src={user?.avt} style={{ marginRight: 10 }} /> : <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
            }
            <span>{user?.userName}</span>
          </div>,
        key: 'account',
        children: [
          {
            type: 'group',
            label: 'Profile',
            children: [
              {
                label: 'Information',
                key: 'information-user',
              },
              {
                label: 'Add money',
                key: 'coming-soon',
              },
              {
                label: 'VIP activation',
                key: 'activation',
              },
              user ?
                {
                  label: <div onClick={confirmNotification}>Log out</div>,
                  key: 'logout'
                } : '',
            ],
          },
        ],
      } : '',
  ];

  const onClick = (e) => {
    if (e.key === 'logout') {
      return;
    }
    else if (e.key === 'activation') {
      history.push(`/coming-soon`)
      setCurrent(e.key);
    }
    else {
      history.push(`/${e.key}`)
      setCurrent(e.key);
    }
  };


  return (
    <Affix offsetTop={0}>
      <div style={{ position: 'relative', zIndex: 99999 }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    </Affix>

  );
};

export default Nav;