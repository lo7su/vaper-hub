import React from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Collapse,
    Typography,
    Button,
    IconButton,
    Card, ListItem, List, Badge,
} from "@material-tailwind/react";
import {observer} from "mobx-react";
const Header = observer(({cartCount}) => {

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
           <List>
               <ListItem className={'h-10'}>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/catalog" className="flex items-center">
                            Каталог
                        </Link>
                    </Typography>
               </ListItem>
               <ListItem className={'h-10'}>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/cart" className="flex items-center">
                            Корзина
                        </Link>
                    </Typography>
               </ListItem>
               <ListItem className={'h-10'}>
                    <Typography
                        as="li"
                        variant= 'small'
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/catalog" className="flex items-center">
                            О нас
                        </Link>
                    </Typography>
               </ListItem>
           </List>
        </ul>
    );

    return (
        <div className="max-h-[768px] w-full">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Button variant={'text'}>
                        <Link to={'/'}>Vaper-hub</Link>
                    </Button>
                    <div></div>
                    <div></div>
                    <div></div>
                    <Link to="/cart" className="flex items-center">
                        <Badge content={cartCount} invisible={cartCount<=0} placement="bottom-end">
                            <IconButton variant={'text'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path
                                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                </svg>
                            </IconButton>
                        </Badge>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>

        </div>
    );

});

export default Header;
