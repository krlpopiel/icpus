package com.icpus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class IcpusApplication {

    public static void main(String[] args) {
        SpringApplication.run(IcpusApplication.class, args);
    }

}
