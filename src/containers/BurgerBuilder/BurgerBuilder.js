import React, { Component } from 'react'

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then((response) => {
                // // Calculate Total Price
                // let total = [];
                // const sum = Object.keys(response.data)
                //     .map((igKey, i) => {
                //         total[i] = [];
                //         [...Array(response.data[igKey])].map(() => {
                //             total[i] = total[i] + INGREDIENT_PRICES[igKey];
                //             return INGREDIENT_PRICES[igKey];
                //         })
                //         return total;
                //     });

                // console.log(sum);
                this.setState({ 
                    ingredients: response.data,
                    // totalPrice: sum
                })
                this.updatePurchaseState(response.data)                
            })
            .catch(error => {
                this.setState({ error: error })
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            window.alert('No More ' + type + ' Ingredients. Please add some ingredients');
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceSubtraction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Praveen Kumar',
                address: {
                    street: 'Marikavalasa',
                    zipCode: '530048',
                    country: 'India'
                },
                email: 'praveenking880@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <center><h3>Ingredients can't be loaded</h3></center> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchasingHandler}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
