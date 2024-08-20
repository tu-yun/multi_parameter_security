package kr.or.thekeeperskorea.mb_usr.config.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync    //@Async 활성화
public class SpringAsyncConfig implements AsyncConfigurer {

    /**
     * spring boot async 활성화
     * @return Executor
     */
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);    //동시에 실행시킬 쓰레드의 개수
        executor.setMaxPoolSize(10);    //쓰레드 풀의 최대사이즈
        executor.initialize();

        return executor;
    }
}
