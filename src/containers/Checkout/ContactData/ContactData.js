import React, { Component } from 'react'

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import axios from "../../../axios-orders";
import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key]['value']
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidation = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim()!=='' && isValid
        }
        if (rules.minLength) {
            isValid = value.length>=rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length<=rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        updatedOrderFormElement.valid = this.checkValidation(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;

        let formIsValid = true;

        for (let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }   

    render() {
        let formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button 
                    btnType="Success" 
                    disabled={!this.state.formIsValid} 
                    clicked={this.orderHandler}
                >ORDER</Button>
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
