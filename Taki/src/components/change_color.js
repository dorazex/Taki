import React from 'react';

const ChangeColorComp = (props) => {
    if (props.show == false)
        return null;

    return (
        <div id="change-color-modal" className="modal">
            <div className="change-color-modal-content">
                <table width="100%" height="100%">
                    <tbody>
                        <tr>
                            <td id="yellow" onClick={() => props.handleClose('yellow')} />
                            <td id="red" onClick={() => props.handleClose('red')} />
                        </tr>
                        <tr>
                            <td id="blue" onClick={() => props.handleClose('blue')} />
                            <td id="green" onClick={() => props.handleClose('green')} />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ChangeColorComp;

