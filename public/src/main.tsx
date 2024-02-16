import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from "./store.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <ToastContainer position="bottom-center" autoClose={2000} />
    <App />
    </Provider>
)
