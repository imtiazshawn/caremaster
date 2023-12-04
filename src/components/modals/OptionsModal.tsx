import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";

import { Column, FlexBox } from "@components/common";
import { Button, XButton } from "@components/common/Button";
import { ModalTitle } from "@components/common/Typography";

import { TemplateFieldDTO } from "$types/templateField";
import TextField from "@common/TextField";
import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  field: TemplateFieldDTO;
  setField: React.Dispatch<React.SetStateAction<TemplateFieldDTO>>;
};

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   // description: yup.string(),
//   // template: yup.number().required(),
//   // parent: yup.number().nullable().required(),
// });

const OptionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  field,
  setField,
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };
  const [localOptions, setLocalOptions] = React.useState(field?.options);
  const [newOption, setNewOption] = React.useState("");
  const [newScore, setNewScore] = React.useState<number | string | undefined>(
    "",
  );

  useEffect(() => {
    setLocalOptions(field?.options);
  }, [field?.options]);

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          width: "650px",
        },
      }}
      onClose={onCloseHandler}
    >
      <DialogTitle sx={{ flexDirection: "row" }}>
        <ModalTitle>Template Form</ModalTitle>
      </DialogTitle>
      <XButton
        onClick={onCloseHandler}
        sx={{
          position: "absolute",
          right: 24,
          top: 10,
        }}
      />
      <Divider />
      <DialogContent>
        <Column>
          <Column>
            <FlexBox
              sx={{
                flexWrap: "wrap",
              }}
            >
              {localOptions?.map((option: any, index: number) => {
                return (
                  <FlexBox key={option.name}>
                    <FlexBox
                      sx={{
                        borderRadius: "50px",
                        padding: "10px",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {option.name + (option.score ? `(${option.score})` : "")}
                      <Close
                        sx={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => {
                          const newOptions = localOptions.filter(
                            (_: any, i: number) => i !== index,
                          );
                          setLocalOptions(newOptions);
                          setField({ ...field, options: newOptions });
                        }}
                      />
                    </FlexBox>
                  </FlexBox>
                );
              })}
            </FlexBox>
          </Column>
          <FlexBox sx={{ justifyContent: "flex-start" }}>New Option</FlexBox>
          <FlexBox sx={{ justifyContent: "flex-start" }}>
            <TextField
              label='Option'
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              variant='outlined'
              sx={{ width: "100%" }}
            />
            <TextField
              label='Score'
              value={newScore}
              onChange={(e) =>
                setNewScore(
                  Number.isNaN(Number(e.target.value))
                    ? e.target.value
                    : Number(e.target.value),
                )
              }
              variant='outlined'
              sx={{ width: "100%" }}
            />
            <Button
              variant='outlined'
              sx={{
                width: "max-content",
              }}
              onClick={() => {
                if (newOption) {
                  const newOptions = [
                    ...localOptions,
                    { name: newOption, score: newScore },
                  ];
                  setLocalOptions(newOptions);
                  setField({ ...field, options: newOptions });
                  setNewOption("");
                  setNewScore("");
                }
              }}
            >
              +
            </Button>
          </FlexBox>
          <FlexBox
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setField({ ...field, options: localOptions });
                onCloseHandler();
              }}
            >
              Save
            </Button>
          </FlexBox>
        </Column>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsModal;
