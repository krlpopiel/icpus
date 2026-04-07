package com.icpus;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cpus")
@CrossOrigin(origins = "http://localhost:5173")
public class CpuController {
    private final CpuService cpuService;

    public CpuController(CpuService cpuService) {
        this.cpuService = cpuService;
    }

    @GetMapping
    public List<CPU> getAllCpus(){
        return cpuService.getAllCpus();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CPU> getCpuById(@PathVariable Integer id){
        return cpuService.getCpuById(id).map(cpu -> ResponseEntity.ok().body(cpu))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CPU> createCpu(@Valid @RequestBody CPU newCpu){
        CPU savedCpu = cpuService.createCpu(newCpu);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCpu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCpu(@PathVariable Integer id){
        if( cpuService.deleteCpu(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CPU> updateCpu(@PathVariable Integer id, @Valid @RequestBody CPU updatedCpu) {
        return cpuService.updateCpu(id, updatedCpu).map(cpu -> ResponseEntity.ok().body(cpu))
                .orElse(ResponseEntity.notFound().build());
    }
}
