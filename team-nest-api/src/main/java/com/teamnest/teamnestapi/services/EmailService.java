package com.teamnest.teamnestapi.services;

import java.time.Year;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

  @Value("${spring.mail.properties.mail.smtp.from}")
  private String fromEmail;

  @Value("${app.frontend.login-url}")
  private String frontendLoginUrl;

  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Override
  public void sendWelcomeEmail(String toEmail, String name) {
    Context context = new Context();
    context.setVariable("name", name);
    context.setVariable("currentYear", Year.now().getValue());
    context.setVariable("loginUrl", frontendLoginUrl);

    String process = templateEngine.process("welcome-email", context);
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

    try {
      helper.setFrom(fromEmail);
      helper.setTo(toEmail);
      helper.setSubject("Welcome to Team Nest!");
      helper.setText(process, true);
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      throw new RuntimeException("Failed to send welcome email");
    }
  }
}
