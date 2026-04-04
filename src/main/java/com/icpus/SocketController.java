package com.icpus;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sockets")
@CrossOrigin(origins = "http://localhost:5173")
public class SocketController {
    private final SocketService socketService;


    public SocketController(SocketService socketService) {
        this.socketService = socketService;
    }

    @GetMapping
    public List<Socket> getAllSockets(){
        return socketService.getAllSockets();
    }
}
