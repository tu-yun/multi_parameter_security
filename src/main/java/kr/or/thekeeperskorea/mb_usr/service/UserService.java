package kr.or.thekeeperskorea.mb_usr.service;

import kr.or.thekeeperskorea.mb_usr.model.user.PrincipalDetails;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetails loadUserByUsernameAndPlace(String username, Long parkingPlace) throws UsernameNotFoundException {
        UserDto user = userRepository.getLoadByParkingPlace(username, parkingPlace);
        if(user == null){
            throw new UsernameNotFoundException("존재하지 않는 계정입니다.");
        }
        return new PrincipalDetails(user);
    }

    public void insertUserLoginHst(Long usrId){
        userRepository.insertUserLoginHst(usrId);
    }

    public List<UserDto> getMyUserList(Long usrId){
        return userRepository.getMyUserList(usrId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userRepository.getLoad(username);
        if(user == null){
            throw new UsernameNotFoundException("존재하지 않는 계정입니다.");
        }
        return new PrincipalDetails(user);
    }

}
