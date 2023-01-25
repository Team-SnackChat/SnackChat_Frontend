import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { KakaoLoading } from './pages/login/kakao-loading';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/kakao-loading" element={<KakaoLoading />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
