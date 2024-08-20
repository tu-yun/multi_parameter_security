package kr.or.thekeeperskorea.mb_usr.config.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;

public class FirstLoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("servletRequest = " + servletRequest);
        System.out.println("servletResponse = " + servletResponse);
        System.out.println("filterChain = " + filterChain);
    }
}
