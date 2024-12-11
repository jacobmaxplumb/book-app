import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Book } from "./components/Book";

const apiUrl = "https://openlibrary.org/search.json";

function App() {
  const [text, setText] = useState("");
  const [books, setBooks] = useState([]);

  const searchForBookInformation = async () => {
    const searchUrl = `${apiUrl}?title=${text.replace(" ", "+")}`;
    let { data: bookData } = await axios.get(searchUrl);
    bookData = bookData.docs.filter((book) => book.author_name);
    setBooks(
      bookData.map((book) => {
        return {
          cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
          author: book.author_name[0] || book.author_name,
          title: book.title,
          rating: book.ratings_average,
        };
      })
    );
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={searchForBookInformation}>Find Information</button>
      <br />
      {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          cover={book.cover}
          author={book.author}
          rating={book.rating}
        />
      ))}
    </div>
  );
}

export default App;
