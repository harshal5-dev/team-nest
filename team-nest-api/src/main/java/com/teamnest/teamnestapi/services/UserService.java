package com.teamnest.teamnestapi.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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
  private final PasswordEncoder passwordEncoder;
  private final IRoleService roleService;

  @Override
  public User createUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException(
          "User with email '" + user.getEmail() + "' already exists.");
    }
    Role defaultRole = roleService.getDefaultRole();
    user.getRoles().add(defaultRole);
    String encodedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    return userRepository.save(user);
  }

  @Override
  public User getUserByEmail(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email).orElseThrow(
        () -> new UsernameNotFoundException("User with email '" + email + "' not found."));
  }
}
