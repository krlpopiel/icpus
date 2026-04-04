package com.icpus;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String brand;
    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;
    private Double clockspeed;
    private Integer coresCount;
    private Integer threadsCount;
    private Integer tdp;
    private Double priceEUR;


    public CPU(Integer id, String brand, Socket socket_id, Double clockspeed, Integer coresCount, Integer threadsCount, Integer tdp, Double priceEUR) {
        this.id = id;
        this.brand = brand;
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
        return Objects.equals(id, cpu.id) && Objects.equals(brand, cpu.brand) && Objects.equals(socket, cpu.socket) && Objects.equals(clockspeed, cpu.clockspeed) && Objects.equals(coresCount, cpu.coresCount) && Objects.equals(threadsCount, cpu.threadsCount) && Objects.equals(tdp, cpu.tdp) && Objects.equals(priceEUR, cpu.priceEUR);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, brand, socket, clockspeed, coresCount, threadsCount, tdp, priceEUR);
    }
}
