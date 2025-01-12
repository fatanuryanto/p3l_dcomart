
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import ReactExample from './pages/reactExample';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ReactExample
      data = {{ message: "Hello, world!" }}
      />
      <Footer/>
    </div>
  );
}

export default App;
