import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../ui/button";

function ErrorComponent() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-auto mt-60 mx-auto h-screen">
      <p className="text-2xl">Oh! Something went wrong☹️</p>
      <p className="text-red-600 text-sm">{error.message || "Unknown error"}</p>

      <Button
        className="mt-8 text-1xl"
        variant="link"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Return to home
      </Button>
    </div>
  );
}

export default ErrorComponent;
