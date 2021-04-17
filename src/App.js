import './App.css';
import CustomTextField from './components/CustomTextField/CustomTextField'

function App() {
  return (
    <div className="App">
      <CustomTextField suggestions={['thing 1', 'thing 2', 'thing 3', 'thing 4', 'thing 5', 'thing 6', 'thing 7', 'thing 8', 'thing 9', 'thing 10']}  allowedWords = {['how', 'are', 'you']}/>
    </div>
  );
}

export default App;
