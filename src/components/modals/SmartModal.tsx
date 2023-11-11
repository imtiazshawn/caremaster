import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { XButton } from "@components/common/Button";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { ModalTitle } from "@components/common/Typography";

import { useEffect } from "react";

type Props<T extends FieldValues> = {
  isOpen: boolean;
  onClose?: () => void;
  handleFormSubmit: (values: T) => void;
  defaultValues: T;
  selectedValues?: T;
  formTemplate: FormTemplate<any>[];
  isLoading?: boolean;
  title: string;
};

type SmartModalProps = <T extends FieldValues>(props: Props<T>) => JSX.Element;

const SmartModal: SmartModalProps = ({
  handleFormSubmit,
  defaultValues,
  isOpen,
  formTemplate,
  onClose,
  isLoading,
  title,
  selectedValues,
}) => {
  const { handleSubmit, control, watch, setValue, reset } = useForm<
    DefaultValues<any>
  >({
    defaultValues: defaultValues,
  });

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  useEffect(() => {
    if (!selectedValues) {
      return;
    }
    reset({ ...selectedValues });
  }, [reset, selectedValues]);

  const handler = (values: any) => {
    onCloseHandler();
    handleFormSubmit(values);
  };

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
        <ModalTitle>{title}</ModalTitle>
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
        <form onSubmit={handleSubmit(handler)}>
          <Column>
            <SmartForm
              template={formTemplate}
              control={control}
              watch={watch}
              setValue={setValue}
              labelPosition='top'
            />
            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Save
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SmartModal;
