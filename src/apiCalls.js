export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

export const postNewOrder = (newOrder) => {
  fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => this.setState({ orders: [...this.state.orders, data] }))
    .catch(error => console.log('post error:', error))
}