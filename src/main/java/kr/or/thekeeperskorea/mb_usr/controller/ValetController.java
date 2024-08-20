package kr.or.thekeeperskorea.mb_usr.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Validated
@RequestMapping({"apt/valet" , "office/valet"})
public class ValetController {

    private final CarService carService;

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
     * @apiNote 이용내역 화면
     */
    @GetMapping("/list")
    public String list(Model model, @CurrentUser UserDto userDto, HttpServletRequest request,
                       @RequestParam(required = false) String keyword,
                       @RequestParam(required = false) LocalDate startDt,
                       @RequestParam(required = false) LocalDate endDt){

        if(startDt == null || endDt == null){
            endDt = LocalDate.now();
            startDt = endDt.plusWeeks(-1).plusDays(1);
        }

        model.addAttribute("pathname", request.getRequestURI());
        model.addAttribute("keyword", keyword);
        model.addAttribute("startDt", startDt);
        model.addAttribute("endDt", endDt);


        Map<String, Object> result = carService.getUtlCarList(userDto.getPrkplceId(), userDto.getUsrId(), keyword, startDt, endDt);
        model.addAttribute("pathname", request.getRequestURI());
        model.addAttribute("utlCarCnt", result.get("utlCarCnt"));
        model.addAttribute("utlCarList", result.get("utlCarList"));
        return "/valet/list";
    }






}
