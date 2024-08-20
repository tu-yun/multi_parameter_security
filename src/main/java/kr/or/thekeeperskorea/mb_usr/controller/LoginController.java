package kr.or.thekeeperskorea.mb_usr.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class LoginController {

    @ModelAttribute("_1stPathname")
    private String list(HttpServletRequest request) {
        String result = "";
        String[] pathNms = request.getRequestURI().split("/");
        if(pathNms.length > 1 && ("apt".equals(pathNms[1]) || "office".equals(pathNms[1]))){
            result = "/" + pathNms[1];
        }
        return result;
    }

    @GetMapping({"/apt", "office"})
    public String apt(){
        return "/index";
    }

    @GetMapping("/apt/login")
    public String aptLogin(Authentication auth){
        if(auth != null && auth.isAuthenticated() && auth.getAuthorities().contains("ROLE_APT")) {
            return "/index";
        }
        return "/login";
    }

    @GetMapping("/office/login")
    public String officeLogin(Authentication auth){
        if(auth != null && auth.isAuthenticated() && auth.getAuthorities().contains("ROLE_OFFIC")) {
            return "/index";
        }
        return "/login";
    }

}
