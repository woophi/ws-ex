import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  answerTask,
  connectRoom,
  createRoom,
  joinRoom,
  startGame,
} from "./sockets/game";
import { client } from "./sockets/receiver";
const userId = 123;

client.gameFinished = ({ game }) => {
  console.debug("gameFinished", game);
};
client.gameStarted = ({ answers, task }) => {
  console.debug("gameStarted", answers, task);
};
client.nextTask = ({ answers, task }) => {
  console.debug("nextTask", answers, task);
};

function App() {
  const [newRoom, setRoom] = useState("");

  useEffect(() => {
    connectRoom("123", "req", userId);

    client.roomCreated = ({ roomId }) => {
      setRoom(roomId);
      joinRoom(roomId, userId);
    };
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => createRoom("newroom", userId, "req")}>
          create room
        </button>
        <button onClick={() => startGame(newRoom, userId, "easy", [userId])}>
          start game {newRoom}
        </button>
        <button onClick={() => answerTask(newRoom, userId, true)}>
          give me task
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
