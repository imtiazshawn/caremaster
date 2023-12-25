import { Column, FlexBox } from "@components/common";
import { Button } from "@components/common/Button";
import { H3 } from "@components/common/Typography";

import { TemplateFieldDTO } from "$types/templateField";
import { Modal } from "@common/Modal";
import Select from "@common/Select";
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

const commonlyUsedOptions: {
  name: string;
  options: { score: number; name: string }[];
}[] = [
  {
    name: "Agreement",
    options: [
      {
        score: 1,
        name: "Strongly Disagree",
      },
      {
        score: 2,
        name: "Disagree",
      },
      {
        score: 3,
        name: "Neutral",
      },
      {
        score: 4,
        name: "Agree",
      },
      {
        score: 5,
        name: "Strongly Agree",
      },
    ],
  },
  {
    name: "Frequency",
    options: [
      {
        score: 1,
        name: "Never",
      },
      {
        score: 2,
        name: "Rarely",
      },
      {
        score: 3,
        name: "Sometimes",
      },
      {
        score: 4,
        name: "Often",
      },
      {
        score: 5,
        name: "Always",
      },
    ],
  },
];

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
    <Modal
      title='Template Form'
      onCloseHandler={onCloseHandler}
      isOpen={isOpen}
    >
      <Column>
        <Column>
          <FlexBox>
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
          </FlexBox>
        </Column>
        <FlexBox sx={{ justifyContent: "space-between" }}>
          <H3>New Option</H3>

          <Select
            defaultValue='Choose'
            onChange={(e) => {
              const newOptions = commonlyUsedOptions.find(
                (option) => option.name === e.target.value,
              )?.options;
              setLocalOptions(newOptions);
            }}
            options={commonlyUsedOptions.map((option) => option.name)}
          ></Select>
        </FlexBox>
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
    </Modal>
  );
};

export default OptionsModal;
