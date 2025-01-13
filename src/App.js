
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Cart from './components/cart';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Homepage/>
      <Footer/>
    </div>
  );
}

export default App;
