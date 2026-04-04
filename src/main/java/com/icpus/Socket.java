package com.icpus;

import java.util.Objects;

public class Socket {
    private Integer id;
    private String socket;

    public Socket() {
    }

    public Socket(Integer id, String socket) {
        this.id = id;
        this.socket = socket;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSocket() {
        return socket;
    }

    public void setSocket(String socket) {
        this.socket = socket;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Socket socket1 = (Socket) o;
        return Objects.equals(id, socket1.id) && Objects.equals(socket, socket1.socket);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, socket);
    }
}
