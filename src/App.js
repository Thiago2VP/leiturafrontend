import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Loading from './Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, SetBooks] = useState([]);
  const [addVis, setAddVis] = useState("hidden");
  const [resBack, setResBack] = useState("#24273a");
  const [resMessg, setResMessg] = useState("");
  const [name, setName] = useState("");
  const [cover, setCover] = useState("");
  const [url, setUrl] = useState("");
  const [charpter, setCharpter] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:3002/books/`);

        SetBooks(data);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  async function showRes(resValue, message) {
    if (resValue) {
      setResBack("#a6da95");
      setResMessg(message);
      setTimeout(() => {
        setResBack("#24273a");
        setResMessg("");
      }, '2000');
    } else {
      setResBack("#ed8796");
      setResMessg(message);
      setTimeout(() => {
        setResBack("#24273a");
        setResMessg("");
      }, '2000');
    }
  }

  async function bookSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!name) {
      formErrors = true;
      showRes(false, "Nome precisa ser preenchido");
    }

    if (!cover) {
      formErrors = true;
      showRes(false, "Cover precisa ser preenchido");
    }

    if (!url) {
      formErrors = true;
      showRes(false, "Url precisa ser preenchida");
    }

    if (!charpter) {
      formErrors = true;
      showRes(false, "Capítulo precisa ser preenchido");
    }

    if (formErrors) return;
    
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:3002/books/`, {
        name,
        cover,
        shortLink: url,
        charpter,
      });
    
      setIsLoading(false);
      setAddVis("hidden")
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      showRes(false, "Erro");
    }
  }

  async function bookDelete(bookId) {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3002/books/${bookId}`);
    
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      showRes(false, "Erro");
    }
  }

  async function updateChap(bookId, chapter) {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:3002/books/${bookId}`, {
        charpter: parseInt(chapter) + 1,
      });
    
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      showRes(false, "Erro");
    }
  }

  return (
    <div className="App">
      <Loading isLoading={isLoading} />

      <main>
        <div className="booksGrid">
          {books.map(book => (
            <div className="card" id={book.id} key={book.id}>
              <a href={book.url}>
                <img src={book.cover} alt={book.name} />
                <p>{book.charpter}</p>
              </a>
              <div className="cardOpts">
                <button className="addChap" type="button" onClick={() => updateChap(book.id, book.charpter)}>✔</button>
                <button className="trash" type="button" onClick={() => bookDelete(book.id)}>✘</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="addBook" onClick={(e) => {setAddVis("visible"); window.scrollTo(0, 0);}}>+</button>
        <div className="addBookPop" style={{ visibility: addVis }}>
          <h1>Adicionar Livro</h1>
          <form onSubmit={bookSubmit}>
            <label htmlFor='name'>
              Nome:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor='cover'>
              Cover:
              <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor='url'>
              Url:
              <br />
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor='charpter'>
              Capítulo:
              <input type="number" value={charpter} onChange={(e) => setCharpter(e.target.value)} />
            </label>
            <br />
            <br />

            <button type="submit">Salvar</button>
          </form>

          <button
            type="button"
            className="exit"
            onClick={(e) => setAddVis("hidden")}
            style={{ background: "#363a4f", border: "none", fontSize: "30px", right: 0, color: "#ed8796" }}
          >
            ☒
          </button>
        </div>
      </main>
      <p className="result" style={{ backgroundColor: resBack }}>{resMessg}</p>
    </div>
  );
}

export default App;
