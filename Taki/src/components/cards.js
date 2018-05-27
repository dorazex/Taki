import React from 'react';
import CardComp from './card';

const CardsComp = (props) => {
    return (
        <div>
            {
                props.player.cards.map((card, i) => (
                    <CardComp
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

export default CardsComp;