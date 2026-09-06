import { signUpAction } from "@/features/auth/actions/sign-up-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import {
  AuthForm,
  type AuthFormField,
} from "@/features/auth/components/auth-form";

const signUpFields = [
  {
    autoComplete: "name",
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    autoComplete: "email",
    label: "Email address",
    name: "email",
    type: "email",
  },
  {
    autoComplete: "new-password",
    label: "Password",
    name: "password",
    type: "password",
  },
] as const satisfies readonly AuthFormField[];

const SignUpPage = () => (
  <AuthCard
    footer={
      <AuthFooterLink
        href="/signin"
        label="Sign in"
        prompt="Already have an account?"
      />
    }
    title="Create your account"
  >
    <AuthForm
      action={signUpAction}
      fields={signUpFields}
      submitLabel="Sign up"
    />
  </AuthCard>
);

export default SignUpPage;
