import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema matching backend DTO structure
const registerSchema = z
  .object({
    tenantInfo: z.object({
      organizationName: z.string().min(1, "Organization name is required"),
    }),
    ownerInfo: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string(),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.ownerInfo.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tenantInfo: {
        organizationName: "",
      },
      ownerInfo: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
    },
  });

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
