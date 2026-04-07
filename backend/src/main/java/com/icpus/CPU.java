package com.icpus;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.Objects;

@Entity
public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    private String brand;
    @NotBlank
    private String model;
    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;
    @Positive
    private Double clockspeed;
    @Positive
    private Integer coresCount;
    @Positive
    private Integer threadsCount;
    @Positive
    private Integer tdp;
    @Positive
    private Double priceEUR;


    public CPU(Integer id, String brand, String model, Socket socket_id, Double clockspeed, Integer coresCount, Integer threadsCount, Integer tdp, Double priceEUR) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.socket = socket_id;
        this.clockspeed = clockspeed;
        this.coresCount = coresCount;
        this.threadsCount = threadsCount;
        this.tdp = tdp;
        this.priceEUR = priceEUR;
    }

    public CPU() {
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Socket getSocket() {
        return socket;
    }

    public void setSocket(Socket socket) {
        this.socket = socket;
    }

    public Double getClockspeed() {
        return clockspeed;
    }

    public void setClockspeed(Double clockspeed) {
        this.clockspeed = clockspeed;
    }

    public Integer getCoresCount() {
        return coresCount;
    }

    public void setCoresCount(Integer coresCount) {
        this.coresCount = coresCount;
    }

    public Integer getThreadsCount() {
        return threadsCount;
    }

    public void setThreadsCount(Integer threadsCount) {
        this.threadsCount = threadsCount;
    }

    public Integer getTdp() {
        return tdp;
    }

    public void setTdp(Integer tdp) {
        this.tdp = tdp;
    }

    public Double getPriceEUR() {
        return priceEUR;
    }

    public void setPriceEUR(Double priceEUR) {
        this.priceEUR = priceEUR;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CPU cpu = (CPU) o;
        return Objects.equals(id, cpu.id) && Objects.equals(brand, cpu.brand) && Objects.equals(model, cpu.model) && Objects.equals(socket, cpu.socket) && Objects.equals(clockspeed, cpu.clockspeed) && Objects.equals(coresCount, cpu.coresCount) && Objects.equals(threadsCount, cpu.threadsCount) && Objects.equals(tdp, cpu.tdp) && Objects.equals(priceEUR, cpu.priceEUR);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, brand, model, socket, clockspeed, coresCount, threadsCount, tdp, priceEUR);
    }
}
