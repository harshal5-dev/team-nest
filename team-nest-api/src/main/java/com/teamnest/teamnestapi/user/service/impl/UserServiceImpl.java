package com.teamnest.teamnestapi.user.service.impl;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.role.entity.Role;
import com.teamnest.teamnestapi.role.service.RoleService;
import com.teamnest.teamnestapi.user.entity.User;
import com.teamnest.teamnestapi.user.exception.UserAlreadyExistsException;
import com.teamnest.teamnestapi.user.repository.UserRepository;
import com.teamnest.teamnestapi.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleService roleService;

  @Transactional
  @Override
  public User createUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException(user.getEmail());
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

  @Override
  public User save(User user) {
    return userRepository.save(user);
  }

}
