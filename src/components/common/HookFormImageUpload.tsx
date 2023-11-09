import { getFileURL } from "@/Utils";
import placeHolderImage from "@assets/placeholder-image.jpg";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { Box, Row } from ".";
import { H5 } from "./Typography";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const HookFormImageUpload = ({
  label,
  value,
  setValue,
}: {
  label?: string;
  value?: File | string;
  setValue: (newFile: File) => void;
}) => {
  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (files?.length) {
        const file = files[0];
        if (file.size > 10 * 1024 * 1024) {
          return;
        }
        setValue(file);
      }
    },
    [setValue],
  );
  const imgSrc = getFileURL(value);

  return (
    <Row sx={{ gap: 0, alignItems: "center" }}>
      <H5 width='12.5rem'>{label}</H5>

      <Box
        sx={{
          height: "12.5rem",
          width: "12.5rem",
          display: "flex",
          border: "1px solid #E0E0E0",
        }}
      >
        <img
          src={imgSrc || placeHolderImage}
          alt='Image Alt'
          loading='lazy'
          height='auto'
          width='100%'
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      <Button
        variant='outlined'
        startIcon={<UploadFileIcon fontSize='small' />}
        component='label'
        sx={{ ml: 2 }}
      >
        Upload
        <VisuallyHiddenInput
          type='file'
          accept='image/png, image/jpeg, video/mp4, video/x-m4v, video/*'
          multiple={false}
          onChange={({ target: { files } }) => handleFileChange(files)}
        />
      </Button>
    </Row>
  );
};
