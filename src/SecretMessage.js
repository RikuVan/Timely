import React from 'react';
import limitVisibility from './limitVisibility';
import PropTypes from 'prop-types';

const SecretMessageStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  width: '50%',
  margin: '10px auto',
  backgroundColor: '#fbff9e',
  padding: '10px'
};

const SecretMessage = ({message}) => (
  <div style={SecretMessageStyle}>
    <h1>Your secret message: {message}</h1>
  </div>
);

SecretMessage.propTypes = {
  message: PropTypes.string.isRequired,
  visibleFor: PropTypes.number
};

export default limitVisibility(SecretMessage);
