import { FormProvider, useForm } from "react-hook-form";

type FormProps = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
};

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
