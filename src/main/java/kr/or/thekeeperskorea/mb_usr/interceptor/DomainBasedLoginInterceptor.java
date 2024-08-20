package kr.or.thekeeperskorea.mb_usr.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class DomainBasedLoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String serverName = request.getServerName();
        String requestURI = request.getRequestURI();

        // 서브도메인에 따라 리다이렉션할 로그인 페이지 설정
        if ("apt.keeperskorea.com".equals(serverName) && (requestURI.equals("") || requestURI.equals("/"))) {
            response.sendRedirect("/apt");
            return false;  // 이후 처리를 중단하고 리다이렉션
        } else if ("office.keeperskorea.com".equals(serverName) && (requestURI.equals("") || requestURI.equals("/"))) {
            response.sendRedirect("/office");
            return false;
        }

        // 기본 리다이렉션 또는 그대로 진행
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        // 추가 처리 필요 시 작성
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // 완료 후 처리 필요 시 작성
    }
}