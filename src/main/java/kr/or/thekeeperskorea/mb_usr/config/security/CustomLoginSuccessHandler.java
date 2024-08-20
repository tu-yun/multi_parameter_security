package kr.or.thekeeperskorea.mb_usr.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.thekeeperskorea.mb_usr.model.user.PrincipalDetails;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private RequestCache requestCache = new HttpSessionRequestCache();

    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserDto user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
        log.debug("로그인성공 후처리  username:{}", user.getLoginId());

        //Session에서 비밀번호 삭제
        user.setPwd("[PROTECTED]");

        //로그인이력 저장
        try {
            userService.insertUserLoginHst(user.getUsrId());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        //security session 유지 시간(초)
        request.getSession().setMaxInactiveInterval(86400);   //24시간

        SavedRequest savedRequest = this.requestCache.getRequest(request, response);
        String targetUrl = null;
        if (savedRequest != null) {
            String targetUrlParameter = this.getTargetUrlParameter();
            if (!this.isAlwaysUseDefaultTargetUrl() && (targetUrlParameter == null || !StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
                this.clearAuthenticationAttributes(request);
                targetUrl = savedRequest.getRedirectUrl();
            } else {
                this.requestCache.removeRequest(request, response);
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        map.put("targetUrl", targetUrl);
        map.put("pwdInitlAt", user.getPwdInitlAt());

        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(mapper.writeValueAsString(map));
        response.getWriter().flush();
    }

}
