import logo from './logo.svg';
import './App.css';
import { AppRouter } from './routing/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter/>
      {/* <header className="App-header">
        <p>
          Zaid Abujumaiza
        </p>
        <p>
          CS490 INDIVIDUAL PROJECT REACT FRONTEND
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="http://localhost:4000/health/check"
          target="_blank"
          rel="noopener noreferrer"
        >
          CLICK ME TO TEST BACKEND
        </a>
      </header> */}
    </div>
  );
}

export default App;
