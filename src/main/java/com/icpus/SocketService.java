package com.icpus;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocketService {
    private final SocketRepository socketRepository;

    public SocketService(SocketRepository socketRepository) {
        this.socketRepository = socketRepository;
    }

    public List<Socket> getAllSockets(){
        return socketRepository.findAll();
    }
}
