import "./App.css";
import Weather from "./Weather";
import { MagnifyingGlass } from "react-loader-spinner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Find weather details here
          <MagnifyingGlass
            visible={true}
            height="60"
            width="60"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#61dafb"
          />
        </p>

        <Weather />
        <p className="footnote">
          <a
            href="https://github.com/CherylChong/Weather-React"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>{" "}
          by Cheryl
        </p>
      </header>
    </div>
  );
}

export default App;
