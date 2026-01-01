import { Provider } from 'react-redux';
import './App.css'
import Terminal from './components/Terminal'
import { store } from './store/store';
import Display from './components/Display';

function App() {

  return (
    <Provider store={store}>
      <>
        <div className=" h-svh flex flex-col justify-between ">
          <div className=" flex-1">
            <Display />
          </div>
          <div className="">
            <Terminal />
          </div>
        </div>
      </>
    </Provider>
  );
}

export default App
