package kr.or.thekeeperskorea.mb_usr.model.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class PrincipalDetails implements UserDetails {

    private final UserDto user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(("ROLE_" + user.getUsrDvTy())));
        authorities.add(new SimpleGrantedAuthority(("ROLE_" + user.getPrkplceDvTy())));
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.user.getPwd();
    }

    @Override
    public String getUsername() {
        return this.user.getLoginId();
    }

    public UserDto getUser() {
        return this.user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
