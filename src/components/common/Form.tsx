import { forwardRef, useImperativeHandle } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";

type FormProps = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
};

export type FormRef = {
  api: UseFormReturn<any>;
};

export const Form = forwardRef<FormRef, FormProps>(function Form(
  { children, onSubmit },
  ref,
) {
  const methods = useForm();

  useImperativeHandle(
    ref,
    () => ({
      api: {
        ...methods,
      },
    }),
    [methods],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
});
