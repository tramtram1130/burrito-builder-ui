import React, { Component } from 'react';
import './App.css';
import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({ orders: data.orders }))
      .catch(error => console.error('Error fetching:', error));
  }

  postNewOrder = (newOrder) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => this.setState({ orders: [...this.state.orders, data] }))
      .catch(error => console.log('post error:', error))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.postNewOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
