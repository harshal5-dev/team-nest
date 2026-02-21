package com.teamnest.teamnestapi.services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

  @Value("${app.frontend.reset-password-url}")
  private String frontendResetPasswordUrl;

  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Override
  public void sendWelcomeEmail(String toEmail, String name) {
    Context context = new Context();
    context.setVariable("name", name);
    context.setVariable("currentYear", Year.now().getValue());
    context.setVariable("loginUrl", frontendLoginUrl);

    sendTemplatedEmail(toEmail, "Welcome to Team Nest!", "welcome-email", context);
  }

  @Override
  public void sendPasswordResetEmail(String toEmail, String name, String resetToken) {
    String encodedToken = URLEncoder.encode(resetToken, StandardCharsets.UTF_8);
    String resetUrl = frontendResetPasswordUrl + "?token=" + encodedToken;

    Context context = new Context();
    context.setVariable("name", name);
    context.setVariable("currentYear", Year.now().getValue());
    context.setVariable("resetUrl", resetUrl);

    sendTemplatedEmail(toEmail, "Reset your Team Nest password", "password-reset-email", context);
  }

  private void sendTemplatedEmail(String toEmail, String subject, String templateName,
      Context context) {
    String process = templateEngine.process(templateName, context);
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

    try {
      helper.setFrom(fromEmail);
      helper.setTo(toEmail);
      helper.setSubject(subject);
      helper.setText(process, true);
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      throw new RuntimeException("Failed to send email");
    }
  }
}
