import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Upload from './pages/Upload';
import Preview from './pages/Preview';
import VoiceConfig from './pages/VoiceConfig';
import Conversion from './pages/Conversion';
import Player from './pages/Player';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public / Full Screen Pages */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />

        {/* Main App Layout (Authenticated) */}
        <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/voice-config" element={<VoiceConfig />} />
            <Route path="/conversion" element={<Conversion />} />
            <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;