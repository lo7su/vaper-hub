import React from 'react';
import {
    Card,
    Typography,
    IconButton,
    Button, CardHeader, CardBody, Badge, CardFooter
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import AppState from "../../state/appState/AppState.js";

const CartItem = observer(({ product}) => {

    return (
        <Badge
            content={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg> }
           className={'bg-gray-800  border-2 border-white w-10 h-10 mt-2 mr-2'}>
            <Card className={'m-2 flex-row  w-[90vw]'}>
                <Link to={"/product/" + product.id}>
                    <CardHeader shadow={true} floated={false} className="h-40 w-40 m-2">
                        <img
                            src={product.image}
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                </Link>
                <CardBody className={'items-center justify-between pb-0 pl-10'}>
                    <Typography color="blue-gray" className="font-medium min-h-[40px] max-h-[40px]">
                        {product.name}
                    </Typography>
                    <Typography color="blue-gray" className="invisible font-light flex justify-end pr-1  tracking-widest min-h-[40px] max-h-[40px]">
                        invisible
                    </Typography>
                    <div className="flex justify-center items-center">
                        <Button
                            className={'shadow-md'}
                            variant={'text'}

                            size="sm"
                            onClick={() => {AppState.cartDecreaseQuantity(product.id)}}
                        >
                            -
                        </Button>
                        <Typography color="blue-gray" className="mx-2 font-medium shadow-xs">
                            {product.quantity}
                        </Typography>
                        <Button
                            className={'shadow-md'}
                            variant={'text'}
                            size="sm"
                            onClick={() => {AppState.cartIncreaseQuantity(product.id)}}
                        >
                            +
                        </Button>
                    </div>
                    <Typography color="blue-gray" className="font-light flex justify-end pr-1 pt-1 tracking-widest min-h-[10px] max-h-[40px]">
                        {product.price} ₽
                    </Typography>
                </CardBody>
            </Card>
        </Badge>
    )
});

export default CartItem;
