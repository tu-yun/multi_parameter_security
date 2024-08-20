package kr.or.thekeeperskorea.mb_usr.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Pattern;
import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Validated
@RequestMapping({"apt/car" , "office/car"})
public class CarController {

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
     * @apiNote 방문예약 화면
     */
    @GetMapping("/visit")
    public String register(Model model, HttpServletRequest request){
        model.addAttribute("pathname", request.getRequestURI());
        return "/car/visit";
    }






}
