import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);

    setNama('');
    setEmail('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload erniiiii.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <hr style={{ width: '80%', margin: '40px 0' }} />

        <h2>Form Kontak</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#61dafb',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Kirim
          </button>
        </form>

        {submitted && (
          <p style={{ color: 'lightgreen', marginTop: '20px' }}>
            Form berhasil dikirim!
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
