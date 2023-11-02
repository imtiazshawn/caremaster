import { getImageURL } from "@/Utils";
import { COLORS } from "@/shared/constants/colors";
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

export const HookFormFileUpload = ({
  label,
  value,
  setValue,
}: {
  label: string;
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
  const imgSrc = getImageURL(value);

  return (
    <Row sx={{ gap: 0, alignItems: "center" }}>
      <H5 width='12.5rem'>{label}</H5>

      {imgSrc && (
        <Box
          sx={{
            height: "12.5rem",
            width: "12.5rem",
            display: "flex",
          }}
        >
          <img
            src={imgSrc}
            alt='Image Alt'
            loading='lazy'
            height='auto'
            width='100%'
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      )}
      {!imgSrc && (
        <H5
          alignSelf='center'
          color={COLORS.ICON_ACTIVE_COLOR}
        >
          No Photo
        </H5>
      )}
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
