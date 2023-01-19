import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/bodyStyle.css';

export default class Footer extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <>
        <footer className='container-fluid footer mt-5 d-flex flex-column justify-content-center align-items-center'>
            <span>Copyright © 2021 JEH.</span>
            <span>All Right Reserve</span>
        </footer>
      </>
    )
  }
}