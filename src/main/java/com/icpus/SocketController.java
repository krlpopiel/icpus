package com.icpus;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<Socket> getSocketById(@PathVariable Integer id){
        return socketService.getSocketById(id).map(socket -> ResponseEntity.ok().body(socket))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Socket> createSocket(@RequestBody Socket newSocket){
        Socket savedSocket = socketService.createSocket(newSocket);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSocket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSocket(@PathVariable Integer id){
        if(socketService.deleteSocket(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<Socket> updateSocket(@PathVariable Integer id, @RequestBody Socket updatedSocket){
        return socketService.updateSocket(id, updatedSocket).map(socket -> ResponseEntity.ok().body(socket))
                .orElse(ResponseEntity.notFound().build());
    }
}
