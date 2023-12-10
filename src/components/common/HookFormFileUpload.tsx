import { getFileURL } from "@/Utils";
import { COLORS } from "@/shared/constants/colors";
import { FileCopy } from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Row } from ".";
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
  const fileSrc = getFileURL(value);
  // const fileName = getFileName(value);

  return (
    <Row sx={{ gap: 0, alignItems: "center" }}>
      <H5 width='12.5rem'>{label}</H5>

      {fileSrc && (
        <Link
          to={fileSrc}
          style={{
            width: "min-content",
            color: "blue",
            textDecoration: "underline",
            fontSize: "10px",
          }}
        >
          View File
        </Link>
      )}
      {!fileSrc && (
        <H5
          alignSelf='center'
          color={COLORS.ICON_ACTIVE_COLOR}
        >
          <FileCopy sx={{ fontSize: "22px" }} />
        </H5>
      )}
      <Button
        variant='outlined'
        startIcon={<UploadFileIcon fontSize='small' />}
        component='label'
        sx={{ ml: 2, fontSize: "0.6rem", height: "2rem", width: "6rem" }}
      >
        Upload
        <VisuallyHiddenInput
          type='file'
          accept='file/*'
          multiple={false}
          onChange={({ target: { files } }) => handleFileChange(files)}
        />
      </Button>
    </Row>
  );
};
