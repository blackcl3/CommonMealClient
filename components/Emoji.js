import React from 'react';
import PropTypes from 'prop-types';

export default function Emoji({ obj }) {
  if (obj.categoryName === 'other') {
    const label = 'other category';
    const symbol = '🍲';
    return (
      <span className="emoji" role="img" aria-label={label || ''} aria-hidden={label ? 'false' : 'true'}>
        {symbol}
      </span>
    );
  } if (obj.categoryName === 'vegetable') {
    const label = obj.categoryName;
    const symbol = '🫑';
    return (
      <span className="emoji" role="img" aria-label={label || ''} aria-hidden={label ? 'false' : 'true'}>
        {symbol}
      </span>
    );
  }
  return (
    <span className="emoji" role="img" aria-label="" aria-hidden="false">
      {}
    </span>
  );
}

Emoji.propTypes = {
  obj: PropTypes.shape({
    categoryName: PropTypes.string,
  }).isRequired,
};
