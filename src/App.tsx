import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { KakaoLoading } from './pages/login/kakao-loading';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakao-loading" element={<KakaoLoading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
