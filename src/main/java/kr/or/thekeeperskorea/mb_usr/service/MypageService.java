package kr.or.thekeeperskorea.mb_usr.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.or.thekeeperskorea.mb_usr.common.constant.Constants;
import kr.or.thekeeperskorea.mb_usr.config.exception.CustomException;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.model.user.UserInfoChgHstDto;
import kr.or.thekeeperskorea.mb_usr.repository.MypageRepository;
import kr.or.thekeeperskorea.mb_usr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageRepository mypageRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    public boolean initPassword(Long usrId, String newPw) {
        if(newPw.equals(Constants.INIT_PASSWORD)){
            throw new CustomException("새로운 비밀번호가 안전하지 않습니다.");
        }

        int cnt = mypageRepository.updatePasswordNew(usrId, passwordEncoder.encode(newPw));
        if(cnt < 1){
            throw new CustomException("존재하지 않는 계정입니다.");
        }
        return true;
    }

    @Transactional
    public boolean modifyPassword(String loginId, String nowPw, String newPw, HttpServletRequest request) {
        UserDto user = userRepository.getLoad(loginId);
        if(!passwordEncoder.matches(nowPw, user.getPwd())){
            throw new CustomException("기존 비밀번호가 일치하지 않습니다.");
        }
        if(passwordEncoder.matches(newPw, user.getPwd())){
            throw new CustomException("새로운 비밀번호가 기존 비밀번호와 동일합니다.");
        }
        if(newPw.equals(Constants.INIT_PASSWORD)){
            throw new CustomException("새로운 비밀번호가 안전하지 않습니다.");
        }

        Long usrId = user.getUsrId();
        Long prkplceId = user.getPrkplceId();
        int cnt = mypageRepository.updatePassword(usrId, prkplceId, passwordEncoder.encode(newPw));
        if(cnt < 1){
            throw new CustomException("존재하지 않는 계정입니다.");
        }

        UserInfoChgHstDto userInfoChgHst = new UserInfoChgHstDto();
        userInfoChgHst.setUsrId(usrId);
        userInfoChgHst.setUpdPsId(usrId);
        userInfoChgHst.setChgReasonCdId(402L);
        userRepository.insertUserInfoChgHst(userInfoChgHst);

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return true;
    }

}
