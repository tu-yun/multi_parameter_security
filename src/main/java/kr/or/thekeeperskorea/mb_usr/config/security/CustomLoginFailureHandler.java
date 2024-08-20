package kr.or.thekeeperskorea.mb_usr.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.thekeeperskorea.mb_usr.common.util.MessageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class CustomLoginFailureHandler implements AuthenticationFailureHandler {

    private Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.debug("로그인실패 후처리  username:{}", request.getParameter("userId").toString());

        String message = null;
        if (exception instanceof BadCredentialsException) {
            message = MessageUtil.getMessage("error.login.BadCredentials");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else if (exception instanceof UsernameNotFoundException) {
            message = MessageUtil.getMessage("error.login.UsernameNotFoundException");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else if (exception instanceof InternalAuthenticationServiceException) {
            message = MessageUtil.getMessage("error.login.InternalAuthenticationService");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            message = MessageUtil.getMessage("error.login.Exception");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map = new HashMap<>();
        map.put("message", message);

        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(mapper.writeValueAsString(map));
        response.getWriter().flush();
    }

}
