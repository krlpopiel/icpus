import { useState, useEffect } from "react";

const API_BASE_URL = "/api";

function SocketView({ onError, onSocketsChange }) {
  const [sockets, setSockets] = useState([]);
  const [selectedSocket, setSelectedSocket] = useState(null);
  const [socketForm, setSocketForm] = useState({
    socket: ""
  });

  useEffect(() => {
    fetchSockets();
  }, []);

  const fetchSockets = async () => {
    onError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/sockets`);
      if (!response.ok) throw new Error("Failed to fetch Sockets");
      const data = await response.json();
      setSockets(data);
      onSocketsChange(data);
    } catch (err) {
      onError(err.message);
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
    onError(null);

    if (!socketForm.socket || socketForm.socket.trim() === "") {
      onError("Socket name is required.");
      return;
    }

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
      onError(err.message);
    }
  };

  const handleDeleteSocket = async () => {
    if (!selectedSocket) return;
    onError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/sockets/${selectedSocket.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete Socket");
      await fetchSockets();
      handleAddNewSocket();
    } catch (err) {
      onError(err.message);
    }
  };

  return (
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
  );
}

export default SocketView;
