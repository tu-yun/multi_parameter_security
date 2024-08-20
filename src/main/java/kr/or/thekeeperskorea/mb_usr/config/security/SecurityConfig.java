package kr.or.thekeeperskorea.mb_usr.config.security;

import kr.or.thekeeperskorea.mb_usr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.filter.CharacterEncodingFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private final CustomAuthenticationDetailsSource customAuthenticationDetailsSource;

    /**
     * SecurityFilterChain 설정(APT형)
     * @param http
     * @return SecurityFilterChain
     * @throws Exception
     */
    @Bean
    @Order(0)
    SecurityFilterChain aptFilterChain(HttpSecurity http) throws Exception {

        //Security 로그인 시 continue parameter 자동 생성 방지
        HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
        requestCache.setMatchingRequestParameterName(null);

        return http
                .securityMatcher("/apt/**")
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())
                        .xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                        .defaultsDisabled().contentTypeOptions(Customizer.withDefaults())
                )
                .requestCache(request -> request
                        .requestCache(requestCache)
                )
                .formLogin(login -> login
                        .loginPage("/apt/login").permitAll()
                        .loginProcessingUrl("/apt/login_proc")
                        .usernameParameter("userId")
                        .passwordParameter("userPw")
                        .authenticationDetailsSource(customAuthenticationDetailsSource)
                        .successHandler(new CustomLoginSuccessHandler(userService))
                        .failureHandler(new CustomLoginFailureHandler())
                )
                .logout(logout -> logout
                        .logoutUrl("/apt/logout")
                        .logoutSuccessUrl("/apt/home/dashBoard")
                        .deleteCookies("JSESSIONID_USR")
                        .invalidateHttpSession(true)
                )
                .sessionManagement(session -> session
                        .sessionFixation()
                        .changeSessionId()
                        .maximumSessions(100)
                        .maxSessionsPreventsLogin(true)     //false : 이전세션아웃, true : 이전세션점유
                )
                .addFilterBefore(new CharacterEncodingFilter(), CsrfFilter.class).csrf(csrf -> csrf.disable())
                .rememberMe(rememberMe -> rememberMe
                        .rememberMeParameter("usrMe")
                        .rememberMeCookieName("usr-me")
                        .tokenValiditySeconds(1800)
                        .userDetailsService(userService)
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/apt/**").hasRole("APT")
                        .anyRequest().permitAll()
                )
                .exceptionHandling(ex -> ex
                        .accessDeniedHandler(new CustomAccessDeniedHandler("/apt/login"))
                        .authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/apt/login"))
                )
                .build();
    }

    /**
     * SecurityFilterChain 설정(오피스형)
     * @param http
     * @return SecurityFilterChain
     * @throws Exception
     */
    @Bean
    @Order(1)
    SecurityFilterChain officeFilterChain(HttpSecurity http) throws Exception {

        //Security 로그인 시 continue parameter 자동 생성 방지
        HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
        requestCache.setMatchingRequestParameterName(null);

        return http
                .securityMatcher("/office/**")
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())
                        .xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                        .defaultsDisabled().contentTypeOptions(Customizer.withDefaults())
                )
                .requestCache(request -> request
                        .requestCache(requestCache)
                )
                .formLogin(login -> login
                        .loginPage("/office/login").permitAll()
                        .loginProcessingUrl("/office/login_proc")
                        .usernameParameter("userId")
                        .passwordParameter("userPw")
                        .authenticationDetailsSource(customAuthenticationDetailsSource)
                        .successHandler(new CustomLoginSuccessHandler(userService))
                        .failureHandler(new CustomLoginFailureHandler())
                )
                .logout(logout -> logout
                        .logoutUrl("/office/logout")
                        .logoutSuccessUrl("/office/home/dashBoard")
                        .deleteCookies("JSESSIONID_USR")
                        .invalidateHttpSession(true)
                )
                .sessionManagement(session -> session
                        .sessionFixation()
                        .changeSessionId()
                        .maximumSessions(100)
                        .maxSessionsPreventsLogin(true)     //false : 이전세션아웃, true : 이전세션점유
                )
                .addFilterBefore(new CharacterEncodingFilter(), CsrfFilter.class).csrf(csrf -> csrf.disable())
                .rememberMe(rememberMe -> rememberMe
                        .rememberMeParameter("usrMe")
                        .rememberMeCookieName("usr-me")
                        .tokenValiditySeconds(1800)
                        .userDetailsService(userService)
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/office/**").hasRole("OFFICE")
                        .anyRequest().permitAll()
                )
                .exceptionHandling(ex -> ex
                        .accessDeniedHandler(new CustomAccessDeniedHandler("/office/login"))
                        .authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/office/login"))
                )
                .build();
    }

    /**
     * resource/static 제외
     * @return WebSecurityCustomizer
     */
    @Bean
    WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring().requestMatchers("/ClientUI/**", "/coding/**", "/error/**")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());  //["/css/**", "/js/**", "/images/**", "/webjars/**", "/favicon.*", "/*/icon-*"]
    }

    /**
     * PasswordEncoder
     * @return PasswordEncoder
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}

