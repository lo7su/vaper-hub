import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Collapse,
    List,
    ListItem,
    Typography
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import AppState from "../../../state/appState/AppState.js";
import Product from "../../product/Product.jsx";
import Pagination from "../../pagination/Pagination.jsx";
import ProductSkeleton from "../../product/ProductSkeleton.jsx";
import {Link} from "react-router-dom";
import TelegramState from "../../../state/telegramState/TelegramState.jsx";

const Catalog = observer(() => {
    const toggleSelectedFilter = (value, filterType) => {
        AppState.toggleSelectedFilter(value, filterType);
    };


    const toggleOpenSection = (section) => {
        AppState.toggleOpenSection(section);
    };


    return (
        <>
            <div className={'w-full flex items-center justify-center'}>
                <ButtonGroup className={'m-6'} variant={'text'}>
                    <Button onClick={() => toggleOpenSection('brands')}>Бренд</Button>
                    <Button onClick={() => toggleOpenSection('tastes')}>Вкус</Button>
                    <Button onClick={() => toggleOpenSection('puffs')}>Тяги</Button>
                    <Button onClick={() => toggleOpenSection('chargers')}>Зарядка</Button>
                </ButtonGroup>
            </div>
            <Collapse open={AppState.openSections.brands} className={AppState.openSections.brands ? 'flex justify-center mb-4' : 'flex justify-center '}>
                <Card className="w-80">
                    <List>
                        {AppState.brands.map((brand) => (
                            <ListItem
                                key={brand.id}
                                selected={AppState.selectedFilters.brands.has(brand.id)}
                                onClick={() => toggleSelectedFilter(brand.id, 'brands')}

                            >
                                {brand.name}
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </Collapse>
            <Collapse open={AppState.openSections.tastes} className={AppState.openSections.tastes ? 'flex justify-center mb-4' : 'flex justify-center '}>
                <Card className="w-80">
                    <List>
                        {AppState.tastes.map((taste) => (
                            <ListItem
                                key = {taste}
                                selected={AppState.selectedFilters.tastes.has(taste)}
                                onClick={() => toggleSelectedFilter(taste, 'tastes')}
                            >
                                {taste}
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </Collapse>
            <Collapse open={AppState.openSections.puffs} className={AppState.openSections.puffs ? 'flex justify-center mb-4' : 'flex justify-center '}>
                <Card className="w-80">
                    <List>
                        {AppState.puffs.map((puff) => (
                            <ListItem
                                key={puff}
                                selected={AppState.selectedFilters.puffs.has(puff)}
                                onClick={() => toggleSelectedFilter(puff, 'puffs')}
                            >
                                {puff}
                            </ListItem>
                        ))}

                    </List>
                </Card>
            </Collapse>
            <Collapse open={AppState.openSections.chargers} className={AppState.openSections.chargers ? 'flex justify-center mb-4' : 'flex justify-center '}>
                <Card className="w-80">
                    <List>
                        <ListItem
                            selected={AppState.selectedFilters.chargers.has(1)}
                            onClick={() => toggleSelectedFilter(1, 'chargers')}
                        >
                            С зарядкой
                        </ListItem>
                        <ListItem
                            selected={AppState.selectedFilters.chargers.has(0)}
                            onClick={() => toggleSelectedFilter(0, 'chargers')}
                        >
                            Без зарядки
                        </ListItem>
                    </List>
                </Card>
            </Collapse>
            <div>
                <Typography variant="h5" color="blue-gray" className={'flex justify-center shadow-2xl'}>
                    Каталог
                </Typography>
                <div className={'min-h-screen'}>
                    <div className={'grid grid-cols-2 gap-4 mx-2 mb-4 mt-4'}>
                        {AppState.isLoading ? (
                            Array(8).fill().map((_, index) => <ProductSkeleton key={index}/>)
                        ) : AppState.products.length > 0 ? (
                            AppState.products.map((product) => (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    image={AppState.mediaPath + product.image}
                                    price={product.price}
                                />
                            ))
                        ) : (
                            <div className={'flex items-center justify-center col-span-2 py-6'}>
                                <Card className={'w-full max-w-[90vw]'}>
                                    <CardBody className={'text-center pb-0'}>
                                        <Typography variant="h6" color="gray">
                                            По выбранным фильтрам товары отсутствуют.
                                        </Typography>
                                    </CardBody>
                                    <CardFooter>
                                        <div className={'flex justify-center'}>
                                            <Button  variant="gradient" onClick={AppState.resetFilters} className="text-white">
                                                Сбросить фильтры
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                {/*<Pagination/>*/}
                </div>
            </div>
        </>
    );
});

export default Catalog;
