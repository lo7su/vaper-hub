    import {action, makeAutoObservable, runInAction} from "mobx";
    import axios from 'axios';

    class AppState {
        mediaPath = '';
        productUrl = '';
        serverUrl = 'vaper-hub.ru';
        isLoading = false;
        smallAlert = false;
        smallAlertMessage = '';
        products = [];
        product = {};
        connectionError = false;
        cartProducts = {};
        selectedFilters = {
            brands: new Set(),
            tastes: new Set(),
            puffs: new Set(),
            chargers: new Set()
        };
        openSections = {
            brands: false,
            tastes: false,
            puffs: false,
            chargers: false
        };

        brands = [];
        tastes = [];
        puffs = [];

        constructor() {
            makeAutoObservable(this);
            this.productUrl = 'https://' + this.serverUrl + '/api/product';
            this.brandUrl = 'https://' + this.serverUrl + '/api/brand';
            this.getPuffs();
            this.getTastes();
            this.getBrands();
            this.fetchFilteredProducts();
        }

        getPuffs = async () => {
            try {
                const response = await axios.get(`${this.brandUrl}`);
                runInAction(() => {
                    this.brands = response.data;
                });
            } catch (error) {
                console.error("Failed to fetch puffs:", error);
            }
        }

        getBrands= async () => {
            try {
                const response = await axios.get(`${this.productUrl}s/puffs`);
                runInAction(() => {
                    this.puffs = response.data;
                });
            } catch (error) {
                console.error("Failed to fetch puffs:", error);
            }
        }

        resetFilters = () => {
            runInAction(() => {
                Object.keys(this.selectedFilters).forEach(filterType => {
                    this.selectedFilters[filterType].clear();
                });

                Object.keys(this.openSections).forEach(section => {
                    this.openSections[section] = false;
                });

                this.fetchFilteredProducts();
            });
        }

        showAddToCartAlert = (message) => {
            runInAction(() => {
                this.smallAlertMessage = message;
                this.smallAlert = true;
                setTimeout(() => {
                    runInAction(() => {
                        this.smallAlertMessage = '';
                        this.smallAlert = false;
                    });
                }, 8000);

            });
        }

        closeAddToCartAlert = () => {
            runInAction(() => {
                this.smallAlertMessage = '';
                this.smallAlert = false;
            });
        }
        cartAdd = () => {
            const productId = this.product.id; // Предположим, что у товара есть поле id

            if (!this.cartProducts[productId]) {
                this.cartProducts[productId] = this.product;
                this.cartProducts[productId].quantity = 1;
                this.showAddToCartAlert('Товар был добавлен в корзину!');
            } else {
                this.cartProducts[productId].quantity++;
                this.showAddToCartAlert('Количество товара в корзине увеличено!');
            }
        }
        cartRemove = (productId) => {
            if (this.cartProducts[productId]) {
                delete this.cartProducts[productId];
                this.showAddToCartAlert('Товар был удален из корзины!');
            }
        }

        // Метод для уменьшения количества товара в корзине по его id
        cartDecreaseQuantity = (productId) => {
            if (this.cartProducts[productId]) {
                if (this.cartProducts[productId].quantity > 1) {
                    this.cartProducts[productId].quantity--;
                    this.showAddToCartAlert('Количество товара в корзине уменьшено!');
                } else {
                    // Если количество товара уже 1, то удаляем его из корзины
                    this.cartRemove(productId);
                }
            }
        }

        // Метод для увеличения количества товара в корзине по его id
        cartIncreaseQuantity = (productId) => {
            if (this.cartProducts[productId]) {
                this.cartProducts[productId].quantity++;
                this.showAddToCartAlert('Количество товара в корзине увеличено!');
            }
        }
        getTastes = async () => {
            try {
                const response = await axios.get(`${this.productUrl}s/tastes`);
                runInAction(() => {
                    this.tastes = response.data;
                });
            } catch (error) {
                console.error("Failed to fetch tastes:", error);
            }
        }


        getDate() {
            const date = new Date()
            const day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
            const month = date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth();
            const year = date.getFullYear();
            return day + "." + month + "." + year
        }

        setProducts(data) {
            this.products = data;
        }

        showConnectionError() {
            this.connectionError = true;
            setTimeout(() => {
                runInAction(() => {
                    this.connectionError = false;
                });
            }, 10000)
        }
        setProduct(data) {
            this.product = data;
        }

        async getProducts(params = {}) {
            try {
                runInAction(() => {
                    this.isLoading = true;
                });
                const response = await axios.get(this.productUrl, { params });
                runInAction(() => {
                    this.setProducts(response.data);
                    this.isLoading = false;
                });
            } catch (error) {
                console.error("Failed to fetch products:", error);
                this.showConnectionError();
                runInAction(() => {
                    this.isLoading = false;
                });
            }
        }

        fetchFilteredProducts() {
            const params = {};
            // Формирование параметров запроса из выбранных фильтров
            for (const filterType in this.selectedFilters) {
                if (this.selectedFilters[filterType].size > 0) {
                    params[filterType] = Array.from(this.selectedFilters[filterType]).join(',');
                }
            }
            this.getProducts(params);

        }

        async getProduct(id = 0) {
            try {
                const response = await axios.get(`${this.productUrl}/${id}`);
                this.setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        }

        toggleSelectedFilter(value, filterType) {
            runInAction(() => {
                const selectedFilters = this.selectedFilters[filterType];
                if (selectedFilters.has(value)) {
                    selectedFilters.delete(value);
                } else {
                    selectedFilters.add(value);
                }
                this.fetchFilteredProducts();
            });
        }


        toggleOpenSection(section) {
            Object.keys(this.openSections).forEach((key) => {
                if (key !== section) {
                    this.openSections[key] = false;
                }
            });
            this.openSections[section] = !this.openSections[section];
        }
    }

    export default new AppState();
