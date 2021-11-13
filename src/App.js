import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


export class Item{
  constructor(name, itemid, quantity) {
    this.name = name;
    this.itemid = itemid;
    this.quantity = quantity;
  }
}

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    const item1 = new Item("Item1", "3726392", 5);
    const item2 = new Item("Item2", "3837294", 2);
    const item3 = new Item("Item3", "9383726", 3);

    this.state = {
      show: false,
      shop: false,
      selectedItem: item1,
      name: "",
      id: "",
      items: [item1, item2, item3]
    };
  }

  handleCloseShop = () => this.setState({ shop: false });
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  onChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault()
    this.setState({ [name]: value });
  }
  saveChanges = () => {
    this.setState({ show: false });
    console.warn(this.state.name);

    const newItem = new Item(this.state.name, this.state.id, 1);

    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }))
  }

  changeQuantity = (item, plus) => {

    if(plus){
      item.quantity = item.quantity + 1;
    } 
    
    if(!plus && item.quantity > 0)
    {
      item.quantity = item.quantity - 1;
    }

    if(item.quantity == 0)
    {
      this.setState({ shop: true });
      this.setState({ selectedItem: item });
    }

    this.setState({
      items: this.state.items.map(el => (el.id === item.id ? {...el, item} : el))
    });
  }

  render() {
    return (
    <>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Quantity</th>
          <th>Change Quantity</th>
        </tr>
      </thead>
      <tbody>
        {this.state.items.map((item) =>  (
          <tr>
          <td>{item.name}</td>
          <td>{item.itemid}</td>
          <td>{item.quantity}</td>
          <td>
            <Button variant="primary" size="sm" onClick={() => this.changeQuantity(item, true)} >Add</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="primary" size="sm" onClick={() => this.changeQuantity(item, false)}>Remove</Button>
          </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Button variant="primary" onClick={this.handleShow}>
        Add Item
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item to the system</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            Enter name and id of the new item:
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
              <FormControl
                name="name"
                onChange={this.onChange.bind(this)}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"/>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Id</InputGroup.Text>
              <FormControl
                name="id"
                onChange={this.onChange.bind(this)}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"/>
            </InputGroup>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.shop} onHide={this.handleCloseShop}>
        <Modal.Header closeButton>
          <Modal.Title>Your item {this.state.selectedItem.name} is empty</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            Reorder a new item here!
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseShop}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
    );
  }
}

const App = () => (

  <Container className="p-3">
    <h1>Inventory management system</h1>
    <Inventory />
  </Container>

);

export default App;