import './App.css';
import 'tailwindcss/tailwind.css'
import Links from './components/Links';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Links/>
      <ToastContainer/>
    </>
  );
}

export default App;
