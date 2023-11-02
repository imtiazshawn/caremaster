import { ServiceUser } from "$types/serviceUsers";
import { Button } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";
import QRCode from "react-qr-code";
import { Row } from "./common";
import { H5 } from "./common/Typography";

type Props = {
  value: string | undefined;
  setValue: UseFormSetValue<ServiceUser>;
  label: string;
};

export const QRCodeComponent = ({ value, setValue, label }: Props) => {
  const generateQRCode = () => {
    setValue("qr_code", `new qr${Math.random()}`);
  };

  return (
    <Row sx={{ gap: 0, alignItems: "center" }}>
      <H5 width='200px'>{label}</H5>
      <Button
        variant='contained'
        className='rounded-md'
        onClick={generateQRCode}
        sx={{ height: "35px", textTransform: "none" }}
      >
        Generate QR Code
      </Button>
      <QRCode
        size={64}
        style={{ marginLeft: "20px" }}
        value={value ?? ""}
      />
    </Row>
  );
};
