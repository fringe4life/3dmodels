import { css } from "@styled-system/css";
import { signInAction } from "@/features/auth/actions/sign-in-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import {
  AuthForm,
  type AuthFormField,
} from "@/features/auth/components/auth-form";
import { SignInButton } from "@/features/auth/components/sign-in-button";

const signInFields = [
  {
    autoComplete: "email",
    label: "Email address",
    name: "email",
    type: "email",
  },
  {
    autoComplete: "current-password",
    label: "Password",
    name: "password",
    type: "password",
  },
] as const satisfies readonly AuthFormField[];

const SignInPage = () => (
  <AuthCard
    footer={
      <AuthFooterLink
        href="/signup"
        label="Sign up"
        prompt="Don't have an account?"
      />
    }
    title="Sign in to your account"
  >
    <AuthForm action={signInAction} fields={signInFields} submitLabel="Sign in">
      <div className={css({ marginBlockStart: 6 })}>
        <div
          className={css({
            overflow: "hidden",
            textAlign: "center",
            whiteSpace: "nowrap",
          })}
        >
          <span
            className={css({
              _after: {
                insetInlineStart: "100%",
                marginInlineStart: 2,
              },
              _before: {
                insetInlineEnd: "100%",
                marginInlineEnd: 2,
              },
              "&::after,&::before": {
                backgroundColor: "gray.300",
                blockSize: 0.5,
                content: "''",
                inlineSize: "full",
                insetBlockStart: "50%",
                position: "absolute",
              },
              backgroundColor: "white",
              color: "gray.500",
              display: "inline-block",
              position: "relative",
            })}
          >
            Or continue with
          </span>
        </div>
        <div className={css({ marginBlockStart: 6 })}>
          <SignInButton />
        </div>
      </div>
    </AuthForm>
  </AuthCard>
);

export default SignInPage;
