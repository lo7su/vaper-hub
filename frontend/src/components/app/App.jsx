import React from 'react';
import {BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Home from "../pages/home/Home.jsx";
import Catalog from "../pages/catalog/Catalog.jsx";
import Cart from "../pages/cart/Cart.jsx";
import ProductCard from "../pages/product/Product.jsx";
import AppState from "../../state/appState/AppState.js";
import {observer} from "mobx-react";
import ConnectionAlert from "../alert/ConnectionAlert.jsx";
import SmallAlert from "../alert/SmallAlert.jsx";

function App() {
    return (
        <div className={'bg-gray-200'}>
            <BrowserRouter>
                <SwipeableComponent />
            </BrowserRouter>
        </div>
    );
}

const SwipeableComponent = observer(() => {
    const navigate = useNavigate();

    const swipeHandlers = useSwipeable({
        onSwipedRight: () => navigate(-1), // Назад в истории браузера
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div {...swipeHandlers}>
            <Header cartCount={Object.keys(AppState.cartProducts).length} />
                <ConnectionAlert isOpen={AppState.connectionError}></ConnectionAlert>
            <Routes>
                <Route exact path={'/'} element={<Catalog />}></Route>
                <Route path={'/catalog'} element={<Catalog />}></Route>
                <Route path={'/cart'} element={<Cart cartItems={AppState.cartProducts} />}></Route>
                <Route path={'/product/:id'} element={<Product />}></Route>
            </Routes>
            <SmallAlert/>
            <Footer />
        </div>
    );
});
function Product() {
    const { id } = useParams(); // Используйте useParams для получения id

    return (
        <ProductCard productId={id} /> // Передайте id в компонент ProductCard
    );
}
export default App;
