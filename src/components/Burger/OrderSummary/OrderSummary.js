import React from "react";

import Aux from "../../../hoc/Aux/Aux";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={i}>
                    <span style={{textTransform:'capitalize'}}>
                        {igKey}
                    </span>: {props.ingredients[igKey]}
                </li>
            );
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredients}</ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;