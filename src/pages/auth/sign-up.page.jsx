import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}

export default SignUpPage;
