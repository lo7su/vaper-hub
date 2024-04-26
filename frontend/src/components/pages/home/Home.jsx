import { Typography, Card, CardBody, CardFooter, Button, CardHeader } from "@material-tailwind/react";
import CarouselMain from "../../carousel/Carousel.jsx";
import { Link } from "react-router-dom";
import CatalogItem from "../../catalog_item/CatalogItem.jsx";
import CatalogItemMini from "../../catalog_item/CatalogItemMini.jsx";
import AppState from "../../../state/appState/AppState.js";

const Home = () => {
    return (
        <>

            {/*<div className={'py-2 px-3'}>*/}
            {/*    <CarouselMain />*/}
            {/*</div>*/}

            <div className={'px-4 py-2 pt-8'}>
                <Card className={'border-0 shadow-none'}>
                    <CardHeader color={'indigo'}>
                        <img className={'rounded-lg'} style={{
                            padding: 0
                        }}
                            src="src/assets/logo_scooter.jpg"
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography> Ваш источник электронных сигарет на дом! Оформляйте заказы, следите за доставкой и узнавайте о акциях прямо в телеграм.</Typography>
                    </CardBody>
                    <CardFooter className={'justify-center flex '}>
                        <Link to={'/catalog'}>
                            <Button variant={'outlined'} fullWidth={true}>
                                Перейти в каталог
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <div className={'p-6 md:flex'}>
                    <CatalogItem imageSrc={'catalog_main.webp'} mainTitle={'Новое поступление'} secondTitle={AppState.getDate()}></CatalogItem>
                    <div className={'sm: flex justify-between'}>
                        <CatalogItemMini imageSrc={'catalog_main.webp'} mainTitle={'Многоразки'}></CatalogItemMini>
                        <CatalogItemMini imageSrc={'catalog_main.webp'} mainTitle={'Одноразки'}></CatalogItemMini>
                    </div>
                    <CatalogItem imageSrc={'catalog_main.webp'} mainTitle={'Электронки с зарядкой'}></CatalogItem>
                </div>
            </div>
        </>
    );
};


export default Home;
