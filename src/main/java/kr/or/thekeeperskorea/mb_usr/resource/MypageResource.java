package kr.or.thekeeperskorea.mb_usr.resource;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping({"apt/mypage" , "office/mypage"})
public class MypageResource {

    private final MypageService mypageService;

    /**
     * @apiNote 비밀번호 재설정
     * @param newPw:변경비밀번호
     * @return boolean
     */
    @PatchMapping("/secret/init")
    public boolean initPassword(@CurrentUser UserDto user,
                                @RequestParam @NotBlank(message="새로운 비밀번호를 입력해 주세요.")  @Size(min = 4, max = 20, message="새로운 비밀번호를 {min}~{max}자 내외로 입력해 주세요.") String newPw) {
        return mypageService.initPassword(user.getUsrId(), newPw);
    }

}
