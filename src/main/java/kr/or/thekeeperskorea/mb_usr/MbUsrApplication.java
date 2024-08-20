package kr.or.thekeeperskorea.mb_usr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class MbUsrApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MbUsrApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(MbUsrApplication.class, args);
	}

}
