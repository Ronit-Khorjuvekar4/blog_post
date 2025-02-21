import './App.css';
import { AuthProvider } from './context/AuthProvider';
import Navigation from './resuable/Navigation';
import NavRouter from './router/NavRouter';


function App() {
  return (
    <div className="App">
        <Navigation/>
      
          <NavRouter/>
     

    </div>
  );
}

export default App;
