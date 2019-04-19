import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',         // want the form to have a piece of state in the component 
    emai: '',
    phone: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  // set the modal value to whatever it's not
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const member = {
      name, 
      email,
      phone
    };

    //Add item via addItem action
   this.props.addItem(member);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Member
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage member information (email: test@gmail.com/password:test).</h4>
        )} 

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Membership List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='name'
                  name='name'       // this should match with whatever in the state 
                  id='name'
                  placeholder='Name'
                  onChange={this.onChange}  // when we type inside the input, it will fire off
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='phone'>Phone</Label>
                <Input
                  type='phone'
                  name='phone'
                  id='phone'
                  placeholder='Phone'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{addItem})(ItemModal);
