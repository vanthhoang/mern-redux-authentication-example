import React, { Component } from 'react';
import { Container, Button, Table } from 'reactstrap';
import { CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class MembershipList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ _id, name, email, phone }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <tr>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td className="btn-container">
                    {this.props.isAuthenticated ? (
                      <Button
                        className='remove-btn'
                        color='danger'
                        size='sm'
                        onClick={this.onDeleteClick.bind(this, _id)}
                        >
                        &times;
                      </Button>
                    ) : null}
                  </td>
                </tr>
              </CSSTransition>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(MembershipList);

