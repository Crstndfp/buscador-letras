import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

import axios from 'axios';

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('');
  const [artista, setArtista] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0 ){
      return;
    }

    const {artista, cancion} = busquedaLetra;

    const consultarApiLetra = async () => {
      const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [responseLetra, responseArtista] = await Promise.all([
        axios.get(urlLetra),
        axios.get(urlArtista)
      ]);
      
      setLetra(responseLetra.data.lyrics);
      setArtista(responseArtista.data.artists[0]);

    }

    consultarApiLetra();
    setBusquedaLetra('');

  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario 
        setBusquedaLetra={setBusquedaLetra}
      />
      <div children="container md-5">
        <div className="row">
          <div className="col-md-6">
            <Info artista={artista} />
          </div>
          <div className="col-md-6">
            {letra === '' ? null : <Cancion letra={letra} />}            
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
