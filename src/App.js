import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Login from './pages/login';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
