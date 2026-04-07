package com.icpus;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SocketService {
    private final SocketRepository socketRepository;

    public SocketService(SocketRepository socketRepository) {
        this.socketRepository = socketRepository;
    }

    public List<Socket> getAllSockets(){
        return socketRepository.findAll();
    }

    public Optional<Socket> getSocketById(Integer id){
        return socketRepository.findById(id);
    }

    @Transactional
    public Socket createSocket(Socket newSocket){
        return socketRepository.save(newSocket);
    }

    @Transactional
    public Optional<Socket> updateSocket(Integer id, Socket updatedSocket){
        return socketRepository.findById(id).map(existingSocket ->{
            existingSocket.setSocket(updatedSocket.getSocket());

            return socketRepository.save(existingSocket);
        });
    }

    @Transactional
    public boolean deleteSocket(Integer id){
        if(socketRepository.existsById(id)){
            socketRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
