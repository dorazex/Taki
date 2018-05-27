import React from 'react';
import Card from './Card';

const Cards = (props) => {
    return (
        <div>
            {
                props.player.cards.map((card, i) => (
                    <CardComponent
                        key={i}
                        game={props.game}
                        player={props.player}
                        card={card}
                        onCardClicked={props.activeCardOnClick}
                        onChangeColorClicked={props.activeChangeColor}
                    />
                ))
            }
        </div>
    );
};

export default Cards;

