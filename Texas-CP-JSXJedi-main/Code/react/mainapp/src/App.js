import "./App.css";

import NavBar from "./components/Navigation/navbar";
import Footer from "./components/footer"
import ServiceCatalog from "./components/catalog";

function App() {
  return (
    
      <div className="App">
          <NavBar />
        <div className="container">
          <ServiceCatalog />
        </div>
          <Footer />
      </div>
  
  );
}
export default App;
