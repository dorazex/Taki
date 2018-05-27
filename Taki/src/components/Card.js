import React from 'react';

const Card = (props) => {
    const clickHandler = (event) => {
        if (props.card.action == 'changeColor')
            props.onChangeColorClicked(props.key, props.player);
        else props.onCardClicked(props.key, props.player);
    };

    return (
        <div className="card-container" onClick={this.clickHandler}>
            {
                <button>
                    {
                        props.player.isComputerPlayer == false ?
                            <img src="\cards/{props.card.getFileName()}" /> :
                            <img src="\cards/cover_0_0.png" />
                    }
                </button>
            }
        </div>
    );
};

export default Card;












