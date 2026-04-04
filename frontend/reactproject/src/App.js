import Lixo from "./trash.png";
import Lapis from "./editar.png";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [personagens, setPersonagens] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);

  const inputPersonagem = useRef();
  const inputSerie = useRef();
  const inputAno = useRef();
  const inputGenero = useRef();

  async function getPersonagens() {
    try {
      const response = await fetch("http://localhost:8800");
      const data = await response.json();
      if (Array.isArray(data)) {
        setPersonagens(data);
      } else {
        setPersonagens([]);
      }
    } catch (err) {
      setPersonagens([]);
    }
  }

  async function handleSubmit() {
    const dados = {
      personagem: inputPersonagem.current.value,
      serie: inputSerie.current.value,
      ano: inputAno.current.value,
      genero: inputGenero.current.value,
    };

    try {
      const metodo = idEdicao ? "PUT" : "POST";
      const url = idEdicao
        ? `http://localhost:8800/${idEdicao}`
        : "http://localhost:8800";

      await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      alert(idEdicao ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
      setIdEdicao(null);

      // Limpar campos
      inputPersonagem.current.value = "";
      inputSerie.current.value = "";
      inputAno.current.value = "";
      inputGenero.current.value = "";

      getPersonagens();
    } catch (err) {
      alert("Erro ao salvar dados.");
    }
  }

  async function deletePersonagem(id) {
    if (window.confirm("Deseja realmente excluir este personagem?")) {
      try {
        await fetch(`http://localhost:8800/${id}`, { method: "DELETE" });
        getPersonagens();
      } catch (err) {
        alert("Erro ao deletar.");
      }
    }
  }

  function prepararEdicao(item) {
    setIdEdicao(item.id);
    inputPersonagem.current.value = item.personagem;
    inputSerie.current.value = item.serie;
    inputAno.current.value = item.ano;
    inputGenero.current.value = item.genero;
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    getPersonagens();
  }, []);

  return (
    <div className="area-total">
      <div className="faixa-nome">
        <p>
          <strong>Melissa Weiss Perussulo</strong>
        </p>
      </div>
      <div className="container">
        <form>
          <h1>{idEdicao ? "Editar Personagem" : "Adicionar Personagem"}</h1>
          <input
            placeholder="Nome do Personagem"
            ref={inputPersonagem}
            type="text"
          />
          <input placeholder="Série/Filme" ref={inputSerie} type="text" />
          <input placeholder="Ano de Lançamento" ref={inputAno} type="number" />
          <input
            placeholder="Gênero (Ação, Terror, etc)"
            ref={inputGenero}
            type="text"
          />

          <button className="botao" type="button" onClick={handleSubmit}>
            {idEdicao ? "Salvar Alterações" : "Cadastrar Personagem"}
          </button>
        </form>

        <hr />

        <div className="vizualizar">
          <h1>Personagens Cadastrados</h1>
        </div>

        <div className="lista-cards">
          {personagens.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-info">
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Nome:</strong> {item.personagem}
                </p>
                <p>
                  <strong>Origem:</strong> {item.serie}
                </p>
                <p>
                  <strong>Ano:</strong> {item.ano}
                </p>
                <p>
                  <strong>Gênero:</strong> {item.genero}
                </p>
              </div>

              <div className="acoes">
                <button
                  className="btn-edit"
                  onClick={() => prepararEdicao(item)}
                >
                  <img src={Lapis} alt="Editar" />
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deletePersonagem(item.id)}
                >
                  <img src={Lixo} alt="Excluir" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
