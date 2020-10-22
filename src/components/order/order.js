import React from "react";

import classes from "./order.css";

const order = (props) => {
    const ingredients = [];
    // for (let [ingredientName, value] of Object.entries(props.ingredients)) {
    //     ingredients.push({
    //         name: ingredientName,
    //         amount: value
    //     })
    // }

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    let ingredientsList = ingredients.map(ingredient => {
        return <span key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsList}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;