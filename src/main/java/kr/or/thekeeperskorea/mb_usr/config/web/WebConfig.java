package kr.or.thekeeperskorea.mb_usr.config.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import kr.or.thekeeperskorea.mb_usr.interceptor.DomainBasedLoginInterceptor;

@Configuration
@MapperScan("kr.or.thekeeperskorea.mb_usr.repository")
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private DomainBasedLoginInterceptor domainBasedLoginInterceptor;

    /**
     * @apiNote 메시지 소스(파일 messages.properties)
     * @return MessageSource
     */
    @Bean
    MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.addBasenames("classpath:messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    /**
     * @apiNote  validation 메시지 적용
     * @param messageSource
     * @return LocalValidatorFactoryBean
     */
    @Bean
    LocalValidatorFactoryBean getValidator(MessageSource messageSource) {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource);
        return bean;
    }

    /**
     * @apiNote 도메인 기반 로그인 인터셉터 등록
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 인터셉터를 추가하여 모든 요청에 대해 도메인 기반 리다이렉션을 처리
        registry.addInterceptor(domainBasedLoginInterceptor).addPathPatterns("/**");
    }
    
}
