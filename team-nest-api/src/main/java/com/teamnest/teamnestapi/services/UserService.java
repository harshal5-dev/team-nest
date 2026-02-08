package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.exceptions.UserAlreadyExistsException;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserRepository userRepository;

  @Override
  public User createUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException("User with email '" + user.getEmail() + "' already exists.");
    }
    return userRepository.save(user);
  }
}
