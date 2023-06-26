import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
// import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import AlertState from './context/alert/AlertState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
        <Navbar />
          <div className="containermain">
          <Alert/>
            <Routes>
              <Route exact path='/' element={< Home />}></Route>
              {/* <Route exact path='/about' element={< About />}></Route> */}
              <Route exact path='/home' element={< Home />}></Route>
              <Route exact path='/login' element={< Login />}></Route>
              <Route exact path='/signup' element={< Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
