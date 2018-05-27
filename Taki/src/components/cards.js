import React from 'react';
import CardComp from './card';

export default class CardsComp extends React.Component {
    render (){
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
    };
};
