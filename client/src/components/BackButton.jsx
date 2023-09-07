import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = ({ step = -1 }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={e => {
        e.preventDefault();
        navigate(step);
      }}
      type='back'
    >
      &larr;Back
    </Button>
  );
};

export default BackButton;
