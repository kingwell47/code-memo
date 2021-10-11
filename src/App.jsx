import { useSessionStorage, useLocalStorage } from "./useStorage";
import GetPasscode from "./components/GetPasscode";
import NoteList from "./components/NoteList";

function App() {
  const [passCode, setPassCode, removePassCode] = useSessionStorage("pass");
  const [randomCode, setRandomCode, removeRandomCode] = useLocalStorage("rand");

  const getRandomCode = () => {
    if (randomCode) return;
    setRandomCode(Math.floor(Math.random() * 999999));
  };

  return (
    <div className='App'>
      <GetPasscode
        passCode={passCode}
        setPassCode={setPassCode}
        removePassCode={removePassCode}
        randomCode={randomCode}
        getRandomCode={getRandomCode}
        removeRandomCode={removeRandomCode}
      />
      <NoteList passCode={passCode} randomCode={randomCode} />
    </div>
  );
}

export default App;
