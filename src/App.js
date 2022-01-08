
import { useState } from 'react';
import { FiSearch} from 'react-icons/fi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from './services/api.js';
import './style.css';

function App() {


  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch () {
    
    if(input === '') {
      Swal.fire({
        title: 'ERRO',
        text: 'Insira um CEP antes de continuar',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    try {

      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("");

    } catch {

      Swal.fire({
        title: 'ERRO',
        text: 'Erro ao efetuar a busca :(',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      setInput("");

    }

  }

  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">

        <input 
        type="text" 
        placeholder="Digite seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch"
        onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>


        {Object.keys(cep).length > 0 && (

          <main className="main">
            <h2>CEP {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade}/{cep.uf}</span>
          </main>

        )}



    </div>
  );
}

export default App;
