import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

// Lazy loading para performance
const Home = lazy(() => import('./pages/Home'));
const Library = lazy(() => import('./pages/Library'));
const Upload = lazy(() => import('./pages/Upload'));
const Preview = lazy(() => import('./pages/Preview'));
const VoiceConfig = lazy(() => import('./pages/VoiceConfig'));
const Conversion = lazy(() => import('./pages/Conversion'));
const Player = lazy(() => import('./pages/Player'));
const Settings = lazy(() => import('./pages/Settings'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Login = lazy(() => import('./pages/Login'));

const LoadingScreen = () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#0C1115]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
    </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
        <PlayerProvider>
            <Router>
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
            </Router>
        </PlayerProvider>
    </ErrorBoundary>
  );
};

export default App;