import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';
import { HashRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
  <HashRouter>
    <App />
  </HashRouter>
    </MantineProvider>
  </Provider>
);
