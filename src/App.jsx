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
    <main className='App'>
      {passCode ? (
        <NoteList passCode={passCode} randomCode={randomCode} />
      ) : (
        <GetPasscode
          passCode={passCode}
          setPassCode={setPassCode}
          removePassCode={removePassCode}
          randomCode={randomCode}
          getRandomCode={getRandomCode}
          removeRandomCode={removeRandomCode}
        />
      )}
    </main>
  );
}

export default App;
