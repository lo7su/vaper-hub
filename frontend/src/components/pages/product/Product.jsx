import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Button, Rating, Typography, CardHeader } from '@material-tailwind/react';
import AppState from "../../../state/appState/AppState.js";
import { observer } from "mobx-react";
import CarouselMain from "../../carousel/Carousel.jsx";
import ProductSkeleton from "../../product/ProductSkeleton.jsx";

const ProductCard = ({ productId }) => {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoadingData(true);
        setIsLoaded(false);
        AppState.getProduct(productId)
            .then(() => {
                setIsLoadingData(false);
                setIsLoaded(true);
            });
    }, [productId]);

    const addToCart = () => {
        AppState.cartAdd();
    }

    return (
        (isLoadingData && !isLoaded) ? (
            <ProductSkeleton key={1} />
        ) : (
            <Card className="m-3 mr-3 ml-3">
                <CardHeader shadow={true} floated={false} className="h-64 m-1 mb-0">
                    <img
                        src={AppState.product.image}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="pb-0">
                    <div className={'flex flex-col justify-center items-center'}>
                        <h2 className="text-xl font-bold mb-1">{AppState.product.name}</h2>
                        <p className="mb-2">{AppState.product.brand}</p>
                    </div>
                    <div className={'flex justify-between px-6 mb-3'}>
                        <p className="text-2xl font-bold text-red-500 ">{AppState.product.price} ₽</p>
                        <Rating value={4} />
                    </div>
                    <div className={'px-6 pt-4'}>
                        <Typography variant={'h5'} className={'mb-3 tracking-widest'}>
                            Описание
                        </Typography>
                        <p className="text-sm text-gray-700 mb-4">
                            {AppState.product.description}
                        </p>
                        <Typography variant={'h6'} className={'mb-3 mt-6 tracking-widest'}>
                            Характеристики
                        </Typography>
                        <div className={'flex flex-col'}>
                            <p className="text-sm text-gray-700 mb-2">
                                Вкус - {AppState.product.taste}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                Количество затяжек - {AppState.product.puffs}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                Аккумулятор - {AppState.product.charger === true ? 'Перезаряжаемая' : 'Одноразовый'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                Емкость аккумулятора - {AppState.product.strength}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                Тип затяжки - {AppState.product.puff_type}
                            </p>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-between">
                    <div></div>
                    <Button size="lg" className={'flex'} onClick={addToCart} >
                        Купить
                    </Button>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out"
                    >
                        <span>❤</span> {/* Замените на иконку, если доступно */}
                    </button>
                </CardFooter>
            </Card>
        )
    );
}

export default observer(ProductCard);
