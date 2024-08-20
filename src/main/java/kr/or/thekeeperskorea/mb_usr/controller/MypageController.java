package kr.or.thekeeperskorea.mb_usr.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.service.CarService;
import kr.or.thekeeperskorea.mb_usr.service.MypageService;
import kr.or.thekeeperskorea.mb_usr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping({"apt/mypage" , "office/mypage"})
public class MypageController {

    private final CarService carService;
    private final UserService userService;
    private final MypageService mypageService;

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
     * @apiNote 내정보
     */
    @GetMapping("/index")
    public String index(Model model, @CurrentUser UserDto user, HttpServletRequest request){
        model.addAttribute("pathname", request.getRequestURI());
        model.addAttribute("selectMyUserList", userService.getMyUserList(user.getUsrId()));

        return "mypage/index";
    }

    /***
     * 나의 차량 현황
     * @param user
     * @return
     */
    @GetMapping("/myCarList")
    public String myCarList(Model model, @CurrentUser UserDto user){

        model.addAttribute("myCarList", carService.getMyCarList(user.getUsrId()));

    return "mypage/myCarList";
    }

    /**
     * @apiNote 비밀번호 변경 화면
     */
    @GetMapping("/secret/init")
    public String oldPassword(@CurrentUser UserDto user){
        return "mypage/secret/init";
    }


    /**
     * @apiNote 비밀번호 변경 화면
     */
    @GetMapping("/secret/modify")
    public String password(@CurrentUser UserDto user){
        return "mypage/secret/modify";
    }


    /**
     * @apiNote 비밀번호 변경
     */
    @ResponseBody
    @PatchMapping("/secret/modifyNew")
    public boolean modifyPassword(@CurrentUser UserDto operator, HttpServletRequest request,
                                  @RequestParam @NotBlank(message="기존 비밀번호를 입력해 주세요.") @Size(min = 4, max = 20, message="기존 비밀번호를 {min}~{max}자 내외로 입력해 주세요.") String nowPw,
                                  @RequestParam @NotBlank(message="새로운 비밀번호를 입력해 주세요.")  @Size(min = 4, max = 20, message="새로운 비밀번호를 {min}~{max}자 내외로 입력해 주세요.") String newPw) {
        return mypageService.modifyPassword(operator.getLoginId(), nowPw, newPw, request);
    }

}