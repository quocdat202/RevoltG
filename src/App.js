import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Body/Header';
import Content from './Component/Body/Content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Login from './Component/Login/Login';
import Signup from './Component/Login/Signup';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import Swal from 'sweetalert2'
import About from './Component/About';
import User from './Component/User/User';
import Detail from './Component/Detail/Detail';
import Checkpoint from './Component/Checxkpoint/Checkpoint';
import Cart from './Component/Body/Cart';
import CS from './Component/Body/C-S';

function App() {

 

  const [user, setUser] = useState({
    userName: '',
    email: '',
    avt: '',
    uid: ''
  });
  const [reload, setReload] = useState(false)
  const config = {
    apiKey: 'AIzaSyDafK_Fk0gXKC5zEgXdUGNpIT_s_aSexGs',
    authDomain: 'spck-login-b01d4.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (userLogin) => {
      if (!userLogin) {
        // user logs out, handle something here
        console.log('User is not logged in');
        setUser(null);
        return;
      }
      console.log('Logged in user: ', userLogin);
      setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL, email: userLogin.email, uid: userLogin.uid });
    });

    return () => unregisterAuthObserver();
  }, [reload]);

  const notification = (icon, title) => {
    return Swal.fire({
      position: 'top',
      icon: icon,
      width: '20em',
      title: title,
      showConfirmButton: false,
      timer: 2500
    })
  }
  const addToCart = (item) => {
    const inCart = localStorage.getItem(`carts${user?.uid}`);
    console.log(`carts${user?.uid}`);
    const cart = {
        ...item,
        userId: user?.uid
    };
    console.log(cart);

    if (user?.uid) {
        if (inCart) {
            let isCart = JSON.parse(inCart);
            let find = false;
            console.log(isCart);
            isCart = isCart.map(element => {
                if (element.id === item.id) {
                    find = true;
                    notification('warning', 'Already in cart')
                    return { ...element };
                } else {
                    return element;
                }
            })
            if (!find) {
                isCart.push(cart);
            }
            localStorage.setItem(`carts${user?.uid}`, JSON.stringify(isCart));
            return !find ? notification('success', 'Added successfully') : ''
        } else {
            localStorage.setItem(`carts${user?.uid}`, JSON.stringify([cart]));
            return notification('success', 'Added successfully');
        }
    } else {
        return notification('error', 'Please login to continue')
    }
}


  return (
    <Router>
      <div className="App">
        <Header notification={notification} user={user} />

        {/* <Home/> */}

        <Switch>
          <Route path="/" exact component={() => <Content user={user} notification={notification} addToCart={addToCart}  /> } ></Route>
          {/* <Route path="/info-account" exact component={() => <Login />} ></Route> */}
          <Route path="/login" exact component={() => <Login notification={notification} />} ></Route>
          <Route path="/signup" exact component={() => <Signup notification={notification} user={user} setReload={setReload} />} ></Route>
          <Route path="/mobile" exact component={() => <About notification={notification} user={user} />} ></Route>
          <Route path="/cart" exact component={() => <Cart notification={notification} user={user} />} ></Route>
          <Route path="/information-user" exact component={() => <User notification={notification} user={user} />} ></Route>
          <Route path="/game/:id" exact component={(match) => <Detail notification={notification} match={match} addToCart={addToCart} />} ></Route>
          <Route path="/coming-soon" exact component={() => <CS notification={notification} user={user} />} ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
