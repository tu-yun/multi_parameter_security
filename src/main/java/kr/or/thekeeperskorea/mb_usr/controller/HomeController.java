package kr.or.thekeeperskorea.mb_usr.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping({"apt/home" , "office/home"})
public class HomeController {

    private final HomeService homeService;

    @ModelAttribute("_1stPathname")
    private String list(HttpServletRequest request) {
        String result = "";
        String[] pathNms = request.getRequestURI().split("/");
        if(pathNms.length > 1 && ("apt".equals(pathNms[1]) || "office".equals(pathNms[1]))){
            result = "/" + pathNms[1];
        }
        return result;
    }

    /**
     * @apiNote 홈 화면
     * @return userCarCnt:차량카운터
     * @return userCar:차량현황
     */
    @GetMapping("/dashBoard")
    public String list(@CurrentUser UserDto user,
                       Model model, HttpServletRequest request){
        Map<String, Object> result = homeService.getUserCar(user.getUsrId(), user.getPrkplceId());
        model.addAttribute("pathname", request.getRequestURI());
        model.addAttribute("userCarCnt", result.get("userCarCnt"));
        model.addAttribute("leavingCarCnt", result.get("leavingCarCnt"));
        model.addAttribute("getUserCarlist", result.get("getUserCarlist"));
        return "home/dashBoard";
    }

    /**
     * @apiNote 비밀번호 변경
     */
    @GetMapping("/password/init")
    public String password(@CurrentUser UserDto user){
        return "home/password";
    }


}
