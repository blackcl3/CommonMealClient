import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes, { instanceOf, string } from 'prop-types';
import Emoji from './Emoji';

export default function TransactionCard({ obj }) {
  // function getCategoryEmoji() {
  //   if (obj.categoryName === 'other') {
  //     return String.fromCodePoint('U+1F372');
  //   }
  //   return String.fromCodePoint('U+1F963');
  // }

  return (
    <Card className="transaction-card">
      <div>
        <Card.Img src={obj.fromUser[0].photoURL} className="transaction-card-photo" />
      </div>
      <div>
        <Card.Body>
          {obj.fromUser[0].name} gifted <Emoji obj={obj} /> to {obj.toUser[0].name}
        </Card.Body>
      </div>
    </Card>
  );
}

TransactionCard.propTypes = {
  obj: PropTypes.shape({
    categoryName: string,
    toUid: string,
    fromUid: string,
    fromUser: instanceOf(Array),
    toUser: instanceOf(Array),
  }).isRequired,
};
