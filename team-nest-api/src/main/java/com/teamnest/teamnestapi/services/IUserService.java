package com.teamnest.teamnestapi.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.teamnest.teamnestapi.models.User;

public interface IUserService {

  User createUser(User user);

  User getUserByEmail(String email) throws UsernameNotFoundException;

}
