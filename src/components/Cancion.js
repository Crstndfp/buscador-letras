import React, { Fragment } from 'react';

const Cancion = ({ letra }) => (
    <Fragment>
        <h2>Letra Cancion</h2>
        <p className="letra">{letra}</p>
    </Fragment>
)

export default Cancion;