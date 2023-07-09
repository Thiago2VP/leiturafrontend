import React from 'react';
import PropTypes from 'prop-types';

import pep from './peepo-peepo-run.gif';

export default function Loading({ isLoading }) {
  if (!isLoading) return <div />;
  return (
    <div style={{background: '#363a4f', width: '90vw', height: '90vh', display: 'flex', margin: 'auto'}}>
      <div />
      <img src={pep} alt="Carregando..." />
    </div>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
