package com.icpus;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CpuService {
    private final CpuRepository cpuRepository;

    public CpuService(CpuRepository cpuRepository) {
        this.cpuRepository = cpuRepository;
    }

    public List<CPU> getAllCpus(){
        return cpuRepository.findAll();
    }

    public Optional<CPU> getCpuById(Integer id){
        return cpuRepository.findById(id);
    }

    @Transactional
    public CPU createCpu(CPU newCpu){
        return cpuRepository.save(newCpu);
    }

    @Transactional
    public Optional<CPU> updateCpu(Integer id, CPU updatedCpu) {
        return cpuRepository.findById(id).map(existingCpu -> {
            existingCpu.setBrand(updatedCpu.getBrand());
            existingCpu.setModel(updatedCpu.getModel());
            existingCpu.setSocket(updatedCpu.getSocket());
            existingCpu.setClockspeed(updatedCpu.getClockspeed());
            existingCpu.setCoresCount(updatedCpu.getCoresCount());
            existingCpu.setThreadsCount(updatedCpu.getThreadsCount());
            existingCpu.setTdp(updatedCpu.getTdp());
            existingCpu.setPriceEUR(updatedCpu.getPriceEUR());

            return cpuRepository.save(existingCpu);
        });
    }

    @Transactional
    public boolean deleteCpu(Integer id) {
        if (cpuRepository.existsById(id)) {
            cpuRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
