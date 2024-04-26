import React from 'react';
import {Typography, Button, Card, CardFooter, CardHeader, CardBody} from "@material-tailwind/react";
import CartItem from "../../cartItem/CartItem.jsx";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import AppState from "../../../state/appState/AppState.js";
import TelegramState from "../../../state/telegramState/TelegramState.jsx";

const CartPage = observer(({cartItems}) => {
    const itemsArray = Object.values(cartItems);
    const totalCost = itemsArray.reduce((sum, item) => sum + item.price, 0);

    const checkout = () => {
        TelegramState.telegramm.showAlert("деня лох");
    }

    return (

        <div className="p-4 bg-pastel-color min-h-[720px]">
            <div>
                {TelegramState.initState}
            </div>
            {itemsArray.length > 0 && (
                <Typography variant="h4"
                            className="mb-4 ml-3 text-gray-800 font-light tracking-widest flex justify-center">
                    Ваша корзина
                </Typography>
            )}

            <div className={'w-92 flex flex-col justify-center items-center'}>
                {itemsArray.length > 0 && itemsArray.map(item => (
                    <CartItem
                        key={item.id}
                        product={item}
                    />
                ))}
            </div>

            {itemsArray.length === 0 && (
                <div className={'min-h-[620px]  flex items-center justify-center'}>
                    <Card className={''}>
                        <CardBody className={'pb-0'}>
                            <div className={'flex flex-row justify-center items-center'}>
                                <div className={''}>
                                    <Typography variant="h6" className="text-gray-800 font-light tracking-widest">
                                        Ваша корзина корзина пуста.
                                    </Typography>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className={'flex justify-center'}>
                                <Link to={'/catalog'}>
                                    <Button variant="gradient" className="text-white font-light ">
                                        Продолжить покупки
                                    </Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {itemsArray.length > 0 && (
                <div className={'px-6 py-12'}>
                    <div className={'flex justify-between opacity-75'}>
                        <Typography variant="h6" className="text-gray-800 font-light tracking-widest">
                            Cтоимость
                        </Typography>
                        <Typography variant="h6" className="text-gray-800 font-light tracking-widest">
                            {totalCost} ₽
                        </Typography>
                    </div>
                    <div className={'flex justify-between opacity-75 pt-2'}>
                        <Typography variant="h6" className="text-gray-800 font-light tracking-widest">
                            Доставка
                        </Typography>
                        <Typography variant="h6" className="text-gray-800 font-light tracking-widest">
                            100 ₽
                        </Typography>
                    </div>
                    <div className={'flex justify-between pt-2'}>
                        <Typography variant="h6" className="text-gray-800 font-normal tracking-widest">
                            Общая стоимость
                        </Typography>
                        <Typography variant="h6" className="text-gray-800 font-bold tracking-widest">
                            {totalCost + 100} ₽
                        </Typography>
                    </div>

                    <div className={'flex justify-center items-center pt-12 '}>
                        <Button variant="gradient" size={'lg'} onClick={checkout}
                                className="text-white flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                            </svg>
                            ПЕРЕЙТИ К ОПЛАТЕ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default CartPage;
