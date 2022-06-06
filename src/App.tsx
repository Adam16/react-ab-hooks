import useWindowSize from "./hooks/use-window-size";
import "./App.css";

function App() {
  const size = useWindowSize();

  return (
    <main>
      <div>
        <h1>Use Window Size</h1>
        <code>{JSON.stringify(size, null, 4)}</code>
      </div>
    </main>
  );
}

export default App;
