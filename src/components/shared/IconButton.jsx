import { Button } from "../ui/button";

function DeleteButton({ className, children, onClick }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className={className}>
      {children}
    </Button>
  );
}

export default DeleteButton;
