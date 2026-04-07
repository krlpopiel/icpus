import { useState, useEffect } from "react";

const API_BASE_URL = "/api";

function CpuView({ sockets, onError, refreshSockets }) {
  const [cpus, setCpus] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState(null);
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

  useEffect(() => {
    fetchCPUs();
  }, []);

  const fetchCPUs = async () => {
    onError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cpus`);
      if (!response.ok) throw new Error("Failed to fetch CPUs");
      const data = await response.json();
      setCpus(data);
    } catch (err) {
      onError(err.message);
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
    onError(null);

    if (!cpuForm.brand || cpuForm.brand.trim() === "") {
      onError("Brand is required.");
      return;
    }
    if (!cpuForm.model || cpuForm.model.trim() === "") {
      onError("Model is required.");
      return;
    }
    if (!cpuForm.clockspeed || cpuForm.clockspeed <= 0) {
      onError("Clock speed must be greater than zero.");
      return;
    }
    if (!cpuForm.coresCount || cpuForm.coresCount <= 0) {
      onError("Cores count must be greater than zero.");
      return;
    }
    if (!cpuForm.threadsCount || cpuForm.threadsCount <= 0) {
      onError("Threads count must be greater than zero.");
      return;
    }
    if (!cpuForm.tdp || cpuForm.tdp <= 0) {
      onError("TDP must be greater than zero.");
      return;
    }
    if (!cpuForm.priceEUR || cpuForm.priceEUR <= 0) {
      onError("Price must be greater than zero.");
      return;
    }

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
      await refreshSockets();
      handleAddNewCpu();
    } catch (err) {
      onError(err.message);
    }
  };

  const handleDeleteCpu = async () => {
    if (!selectedCpu) return;
    onError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cpus/${selectedCpu.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete CPU");
      await fetchCPUs();
      handleAddNewCpu();
    } catch (err) {
      onError(err.message);
    }
  };

  return (
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
              <br />
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
          <label>Clock Speed (GHz)</label>
          <input
            type="number"
            value={cpuForm.clockspeed}
            onChange={(e) => setCpuForm({ ...cpuForm, clockspeed: parseFloat(e.target.value) })}
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
  );
}

export default CpuView;
