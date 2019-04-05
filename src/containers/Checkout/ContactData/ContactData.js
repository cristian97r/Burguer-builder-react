
import React, { Component } from 'react'

import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
            name: '',
            street: '',
            zipCode: '',
            email: '',
            deliveryMethod: '',
            loading: false
    }

    changeHandler = (event) => {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? 
            this.setState({
                [name]: checked
            })
        :
        this.setState({
            [name]: value
        }) 
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)

        const formData = {
            name: this.state.name,
            street: this.state.street,
            zipCode: this.state.zipCode,
            email: this.state.email,
            deliveryMethod: this.state.deliveryMethod
        }

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        if (formData.name.trim() && formData.street.trim() && formData.zipCode.trim() && formData.email.trim() && formData.deliveryMethod.trim()){
            axios.post('orders.json', order)
            .then(response => {
                this.props.history.push('/')
                this.setState({loading: false})
            })
            .catch(error => {
                this.setState({loading: false})
            })
        } else {
            alert('please fillout all the form')
            this.setState({loading: false})
        }

        
    }
    

  render() {
      let form = (
      <form 
      onSubmit={this.orderHandler}
      className={classes.Input}>
        <input type="text" name="name" required onChange={this.changeHandler} value={this.state.name} placeholder="Your name"/>
        <input type="email" name="email" required onChange={this.changeHandler} value={this.state.email} placeholder="example@example.com"/>
        <input type="text" name="street" required onChange={this.changeHandler} value={this.state.street} placeholder="Street"/>
        <input type="text" name="zipCode" required onChange={this.changeHandler} value={this.state.zipCode} placeholder="Postal Code"/>
        <select 
        value={this.state.deliveryMethod} 
        name="deliveryMethod" 
        onChange={this.changeHandler}>
        <option value="">Please Choose a Delivery Option</option>
        <option value="fastest">Fastest</option>
        <option value="cheapest">Cheapest</option>
        </select>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>
    )
      if(this.state.loading){
          form = <Spinner/>
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
            {form}
      </div>
    )
  }
}

export default ContactData
