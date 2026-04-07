import { useState, useEffect } from "react";
import "./App.css";
import CpuView from "./components/CpuView";
import SocketView from "./components/SocketView";

const API_BASE_URL = "/api";

function App() {
  const [view, setView] = useState("cpus");
  const [sockets, setSockets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSockets();
  }, []);

  const fetchSockets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sockets`);
      if (!response.ok) throw new Error("Failed to fetch Sockets");
      const data = await response.json();
      setSockets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewSwitch = (newView) => {
    setError(null);
    setView(newView);
  };

  return (
    <div className="container">
      <h1>iCPUs</h1>

      <nav>
        <button onClick={() => handleViewSwitch("cpus")}>CPUs</button>
        <button onClick={() => handleViewSwitch("sockets")}>Sockets</button>
      </nav>

      {error && (
        <div className="error" onClick={() => setError(null)} style={{ cursor: 'pointer' }}>
          {error} (Click to close)
        </div>
      )}

      <div className="main-content">
        {view === "cpus" ? (
          <CpuView
            sockets={sockets}
            onError={setError}
            refreshSockets={fetchSockets}
          />
        ) : (
          <SocketView
            onError={setError}
            onSocketsChange={setSockets}
          />
        )}
      </div>
    </div>
  );
}

export default App;
