import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}

export default SignInPage;
