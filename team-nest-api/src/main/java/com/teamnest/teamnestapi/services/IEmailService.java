package com.teamnest.teamnestapi.services;

public interface IEmailService {
  void sendWelcomeEmail(String toEmail, String name);

  void sendPasswordResetEmail(String toEmail, String name, String resetToken);
}
