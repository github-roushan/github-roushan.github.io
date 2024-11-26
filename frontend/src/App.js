import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Personal Website Coming Soon! 🌐</h1>
        <p>We're working hard behind the scenes to bring you the project portfolio and tech blog.</p>
        <p>In the meantime, you can connect with us or follow us on our social media platforms.</p>
        <div className="cta-container">
          <a href="https://x.com/procoder9973" className="cta-button" target="_blank" rel="noopener noreferrer">
            Follow us on X
          </a>
          <a href="https://github.com/github-roushan" className="cta-button" target="_blank" rel="noopener noreferrer">
            Check out our GitHub
          </a>
        </div>
      </header>
      <footer className="App-footer">
        <p>&copy; 2024.  All rights reserved.</p>
        <p>Made with ❤️ and React!</p>
      </footer>
    </div>
  );
}

export default App;
