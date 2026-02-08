package com.teamnest.teamnestapi.services;

import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.exceptions.UserAlreadyExistsException;
import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserRepository userRepository;
  private final IRoleService roleService;

  @Override
  public User createUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException(
          "User with email '" + user.getEmail() + "' already exists.");
    }
    Role defaultRole = roleService.getDefaultRole();
    user.getRoles().add(defaultRole);
    return userRepository.save(user);
  }
}
