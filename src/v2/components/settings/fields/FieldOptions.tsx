import { TemplateFieldDTO } from "$types/templateField";
import { Button } from "@common/Button";
import { Column, FlexBox } from "@common/index";
import OptionsModal from "@components/modals/OptionsModal";
import { useState } from "react";

type FieldOptionsProps = {
  field: TemplateFieldDTO;
  setField: (field: TemplateFieldDTO) => void;
};

export const FieldOptions: React.FC<FieldOptionsProps> = ({
  field,
  setField,
}) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  return (
    <Column>
      <FlexBox>
        <Button
          variant='outlined'
          onClick={() => setIsOptionsModalOpen(true)}
        >
          Options
        </Button>
        <OptionsModal
          isOpen={isOptionsModalOpen}
          onClose={() => setIsOptionsModalOpen(false)}
          field={field}
          // @ts-ignore
          setField={setField}
        />
      </FlexBox>
    </Column>
  );
};
