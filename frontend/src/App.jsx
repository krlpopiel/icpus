import { useState, useEffect } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:8080/api"; //can be moved to .env file

function App() {
  const [view, setView] = useState("cpus");
  const [cpus, setCpus] = useState([]);
  const [sockets, setSockets] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [selectedSocket, setSelectedSocket] = useState(null);
  const [error, setError] = useState(null);

  // Form states for CPU
  const [cpuForm, setCpuForm] = useState({
    brand: "",
    model: "",
    clockspeed: 0,
    coresCount: 0,
    threadsCount: 0,
    tdp: 0,
    priceEUR: 0,
    socketId: ""
  });

  // Form states for Socket
  const [socketForm, setSocketForm] = useState({
    socket: ""
  });

  useEffect(() => {
    fetchCPUs();
    fetchSockets();
  }, []);

  const fetchCPUs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cpus`);
      if (!response.ok) throw new Error("Failed to fetch CPUs");
      const data = await response.json();
      setCpus(data);
    } catch (err) {
      setError(err.message);
    }
  };

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

  const handleCpuSelect = (cpu) => {
    setSelectedCpu(cpu);
    setCpuForm({
      brand: cpu.brand,
      model: cpu.model,
      clockspeed: cpu.clockspeed,
      coresCount: cpu.coresCount,
      threadsCount: cpu.threadsCount,
      tdp: cpu.tdp,
      priceEUR: cpu.priceEUR,
      socketId: cpu.socket?.id || ""
    });
  };

  const handleAddNewCpu = () => {
    setSelectedCpu(null);
    setCpuForm({
      brand: "",
      model: "",
      clockspeed: 0,
      coresCount: 0,
      threadsCount: 0,
      tdp: 0,
      priceEUR: 0,
      socketId: sockets.length > 0 ? sockets[0].id : ""
    });
  };

  const handleSaveCpu = async () => {
    try {
      const socket = sockets.find(s => s.id === parseInt(cpuForm.socketId));
      const payload = {
        ...cpuForm,
        socket: socket ? { id: socket.id, socket: socket.socket } : null
      };

      const url = selectedCpu 
        ? `${API_BASE_URL}/cpus/${selectedCpu.id}`
        : `${API_BASE_URL}/cpus`;
      
      const method = selectedCpu ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to save CPU");
      
      await fetchCPUs();
      handleAddNewCpu();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCpu = async () => {
    if (!selectedCpu) return;
    try {
      const response = await fetch(`${API_BASE_URL}/cpus/${selectedCpu.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete CPU");
      await fetchCPUs();
      handleAddNewCpu();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocketSelect = (socket) => {
    setSelectedSocket(socket);
    setSocketForm({
      socket: socket.socket
    });
  };

  const handleAddNewSocket = () => {
    setSelectedSocket(null);
    setSocketForm({
      socket: ""
    });
  };

  const handleSaveSocket = async () => {
    try {
      const url = selectedSocket 
        ? `${API_BASE_URL}/sockets/${selectedSocket.id}`
        : `${API_BASE_URL}/sockets`;
      
      const method = selectedSocket ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(socketForm)
      });

      if (!response.ok) throw new Error("Failed to save Socket");
      
      await fetchSockets();
      handleAddNewSocket();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSocket = async () => {
    if (!selectedSocket) return;
    try {
      const response = await fetch(`${API_BASE_URL}/sockets/${selectedSocket.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete Socket");
      await fetchSockets();
      handleAddNewSocket();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>CPU & SOCKET MANAGER</h1>
      
      <nav>
        <button onClick={() => setView("cpus")}>CPUs</button>
        <button onClick={() => setView("sockets")}>Sockets</button>
      </nav>

      {error && <div className="error">{error}</div>}

      <div className="main-content">
        {view === "cpus" ? (
          <>
            <div className="list-section">
              <h2>CPUs</h2>
              <button onClick={handleAddNewCpu}>Add New CPU</button>
              <ul>
                {cpus.map((cpu) => (
                  <li 
                    key={cpu.id} 
                    className={selectedCpu?.id === cpu.id ? "selected" : ""}
                    onClick={() => handleCpuSelect(cpu)}
                  >
                    <strong>{cpu.brand} {cpu.model}</strong>
                    <br/>
                    <small>Socket: {cpu.socket?.socket || "N/A"}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-section">
              <h2>{selectedCpu ? "Edit CPU" : "Add CPU"}</h2>
              <div className="form-group">
                <label>Brand</label>
                <input 
                  type="text" 
                  value={cpuForm.brand} 
                  onChange={(e) => setCpuForm({ ...cpuForm, brand: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input 
                  type="text" 
                  value={cpuForm.model} 
                  onChange={(e) => setCpuForm({ ...cpuForm, model: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Socket</label>
                <select 
                  value={cpuForm.socketId}
                  onChange={(e) => setCpuForm({ ...cpuForm, socketId: e.target.value })}
                >
                  {sockets.map(s => (
                    <option key={s.id} value={s.id}>{s.socket}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Clock Speed (MHz)</label>
                <input 
                  type="number" 
                  value={cpuForm.clockspeed} 
                  onChange={(e) => setCpuForm({ ...cpuForm, clockspeed: parseInt(e.target.value) })} 
                />
              </div>
              <div className="form-group">
                <label>Cores</label>
                <input 
                  type="number" 
                  value={cpuForm.coresCount} 
                  onChange={(e) => setCpuForm({ ...cpuForm, coresCount: parseInt(e.target.value) })} 
                />
              </div>
              <div className="form-group">
                <label>Threads</label>
                <input 
                  type="number" 
                  value={cpuForm.threadsCount} 
                  onChange={(e) => setCpuForm({ ...cpuForm, threadsCount: parseInt(e.target.value) })} 
                />
              </div>
              <div className="form-group">
                <label>TDP (W)</label>
                <input 
                  type="number" 
                  value={cpuForm.tdp} 
                  onChange={(e) => setCpuForm({ ...cpuForm, tdp: parseInt(e.target.value) })} 
                />
              </div>
              <div className="form-group">
                <label>Price (EUR)</label>
                <input 
                  type="number" 
                  value={cpuForm.priceEUR} 
                  onChange={(e) => setCpuForm({ ...cpuForm, priceEUR: parseFloat(e.target.value) })} 
                />
              </div>
              <div className="actions">
                <button onClick={handleSaveCpu}>Save</button>
                {selectedCpu && (
                  <button className="btn-delete" onClick={handleDeleteCpu}>Delete</button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="list-section">
              <h2>Sockets</h2>
              <button onClick={handleAddNewSocket}>Add New Socket</button>
              <ul>
                {sockets.map((socket) => (
                  <li 
                    key={socket.id} 
                    className={selectedSocket?.id === socket.id ? "selected" : ""}
                    onClick={() => handleSocketSelect(socket)}
                  >
                    <strong>{socket.socket}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-section">
              <h2>{selectedSocket ? "Edit Socket" : "Add Socket"}</h2>
              <div className="form-group">
                <label>Socket Name</label>
                <input 
                  type="text" 
                  value={socketForm.socket} 
                  onChange={(e) => setSocketForm({ ...socketForm, socket: e.target.value })} 
                />
              </div>
              <div className="actions">
                <button onClick={handleSaveSocket}>Save</button>
                {selectedSocket && (
                  <button className="btn-delete" onClick={handleDeleteSocket}>Delete</button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
