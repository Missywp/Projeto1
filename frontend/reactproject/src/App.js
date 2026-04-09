import Lixo from "./trash.png";
import Lapis from "./editar.png";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Formulario({ handleSubmit, tituloPagina, tituloBotao }) {
  const navigate = useNavigate();
  const inputPersonagem = useRef();
  const inputSerie = useRef();
  const inputAno = useRef();
  const inputGenero = useRef();

  return (
    <form>
      <h1>{tituloPagina}</h1>
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

      <button
        className="botao"
        type="button"
        onClick={() =>
          handleSubmit(
            inputPersonagem,
            inputSerie,
            inputAno,
            inputGenero,
            navigate,
          )
        }
      >
        {tituloBotao}
      </button>
    </form>
  );
}

function App() {
  const [personagens, setPersonagens] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);

  async function getPersonagens() {
    try {
      const response = await fetch("http://localhost:8800");
      const data = await response.json();
      setPersonagens(Array.isArray(data) ? data : []);
    } catch (err) {
      setPersonagens([]);
    }
  }

  async function handleSubmit(refNome, refSerie, refAno, refGenero, navigate) {
    const dados = {
      personagem: refNome.current.value,
      serie: refSerie.current.value,
      ano: refAno.current.value,
      genero: refGenero.current.value,
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
      getPersonagens();
      navigate("/itens");
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

  useEffect(() => {
    getPersonagens();
  }, []);

  return (
    <Router>
      <div className="area-total">
        <div className="faixa-nome">
          <p>
            <strong>Melissa Weiss Perussulo</strong>
          </p>
          <nav
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link
              to="/"
              onClick={() => setIdEdicao(null)}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Cadastrar
            </Link>
            <Link
              to="/itens"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Ver Itens
            </Link>
          </nav>
        </div>

        <div className="container">
          <Routes>
            {/* PÁGINA 1: CADASTRO */}
            <Route
              path="/"
              element={
                <Formulario
                  handleSubmit={handleSubmit}
                  tituloPagina="Adicionar Personagem"
                  tituloBotao="Cadastrar Personagem"
                />
              }
            />

            {/* PÁGINA 2: LISTA COMPLETA */}
            <Route
              path="/itens"
              element={
                <>
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
                          <Link to="/editar">
                            <button
                              className="btn-edit"
                              onClick={() => setIdEdicao(item.id)}
                            >
                              <img src={Lapis} alt="Editar" />
                            </button>
                          </Link>
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
                </>
              }
            />

            {/*EDIÇÃO */}
            <Route
              path="/editar"
              element={
                <Formulario
                  handleSubmit={handleSubmit}
                  tituloPagina="Editar Personagem"
                  tituloBotao="Salvar Alterações"
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
