import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders"
import Order from "../../components/order/order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.getOrders();
    }
    

    render () {
        return(
            <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} 
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(actions.getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));