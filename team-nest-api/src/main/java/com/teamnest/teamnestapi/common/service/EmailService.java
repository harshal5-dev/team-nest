package com.teamnest.teamnestapi.common.service;

public interface EmailService {
  void sendWelcomeEmail(String toEmail, String name);

  void sendPasswordResetEmail(String toEmail, String name, String resetToken);
}
