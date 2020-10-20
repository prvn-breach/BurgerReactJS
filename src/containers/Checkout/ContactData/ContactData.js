import React, { Component } from 'react'

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios-orders";
import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    loading: false
                });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your name" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
