import { Button } from "@common/Button";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      sx={{
        fontSize: "1.2rem",
        gap: "0.5rem",
      }}
    >
      <ArrowBack />
      Back
    </Button>
  );
};
