import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MapContent from './components/MapContent';
import About from './components/About';
import Method from './components/Method';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/method" element={<Method />} />
        <Route path="/map" element={<MapContent />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
