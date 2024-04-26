import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Collapse, ListItem, List,
} from "@material-tailwind/react";
import React, {useEffect} from "react";
import ClickAwayListener from 'react-click-away-listener';
import AppState from "../../state/appState/AppState.js";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";



const Product = observer((({ id, name, description, image, price }) => {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const offOpen = () => setOpen((cur) => false )

    const addToCart = async () => {
        await AppState.getProduct(id);
        AppState.cartAdd();
    }

    return (

        <Card className={ 'm-2'}>
            <Link to={"/product/" + id}>
            <CardHeader shadow={true} floated={false} className="h-40 m-1 mb-0">
                <img
                    src={image}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
                </CardHeader>
            </Link>
            <CardBody className={'pb-0 pt-1'}>
                <div className="mb-2 flex flex-col items-center justify-between">
                    <Typography color="blue-gray" className="font-medium min-h-[52px] max-h-[52px]">
                        {name}
                    </Typography>
                    <Typography color="blue-gray" className="font-light mt-4  tracking-widest justify-end flex ">
                        {price} ₽
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0 pb-3 mb-0">
                <Button
                    onClick={addToCart}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 spacing tracking-widest"
                >
                    Купить
                </Button>
            </CardFooter>
        </Card>
    );
}));

export default Product;
