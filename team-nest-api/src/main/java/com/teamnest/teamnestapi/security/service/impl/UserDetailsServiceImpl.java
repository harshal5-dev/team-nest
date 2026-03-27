package com.teamnest.teamnestapi.security.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.security.dto.UserDetailsDTO;
import com.teamnest.teamnestapi.user.entity.User;
import com.teamnest.teamnestapi.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserService userService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userService.getUserByEmail(username);
    return new UserDetailsDTO(user);
  }

}
