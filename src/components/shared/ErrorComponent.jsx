import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function ErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-auto mt-60 mx-auto">
      <p className="text-2xl">Oh! Something went wrong☹️</p>

      <Button
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
