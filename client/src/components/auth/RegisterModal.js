import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink, 
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',        // want the form to have a piece of state in the component 
    email: '',
    password: '', 
    msg: null       // null by default
};

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired, 
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
        //check for register error
        if (error.id === 'REGISTER_FAIL'){
            this.setState({msg: error.msg.msg})
        } else {
            this.setState({msg: null});
        }
    }
        // If authenticated, close modal   
        if (this.state.modal) { 
            if (isAuthenticated) {
                this.toggle();
            }
        }
  }


  // set the modal value to whatever it's not
  toggle = () => {
      //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {name, email, password} = this.state; 

    //Create User Object
    const newUser = {
        name,
        email,
        password
    }; 
    //Attempt to register
    this.props.register(newUser);

  };

  render() {
    return (
      <div>
        {/* {this.props.isAuthenticated ? ( */}
        <NavLink onClick={this.toggle} href="#">
            Register 
        </NavLink>
        {/* ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
        )} */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
              {this.state.msg ? (<Alert color = "danger">{this.state.msg}</Alert>): null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'       // this should match with whatever in the state 
                  id='name'
                  placeholder='Name'
                  className = 'mb-3'
                  onChange={this.onChange}  // when we type inside the input, it will fire off
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'       // this should match with whatever in the state 
                  id='email'
                  placeholder='Email'
                  className = 'mb-3'        // margin bottom 3 
                  onChange={this.onChange}  // when we type inside the input, it will fire off
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'       // this should match with whatever in the state 
                  id='password'
                  placeholder='Password'
                  className = 'mb-3'
                  onChange={this.onChange}  // when we type inside the input, it will fire off
                />

                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal);
