package com.teamnest.teamnestapi.user.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.teamnest.teamnestapi.user.entity.User;

public interface UserService {

  User createUser(User user);

  User getUserByEmail(String email) throws UsernameNotFoundException;

  User save(User user);

}
