import { Typography, TypographyProps } from "@mui/material";

export const H1: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h1'
    fontSize='2rem'
    fontWeight={600}
    {...props}
  />
);

export const H2: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h2'
    fontSize='1.5rem'
    fontWeight={600}
    {...props}
  />
);

export const H3: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h3'
    fontSize='1.25rem'
    fontWeight={600}
    {...props}
  />
);

export const H4: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h4'
    fontSize='1.125rem'
    lineHeight={1}
    fontWeight={500}
    {...props}
  />
);

export const H5: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h5'
    fontSize='1rem'
    fontWeight={500}
    {...props}
  />
);

export const H6: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h6'
    fontSize='0.875rem'
    fontWeight={500}
    {...props}
  />
);

export const Paragraph: React.FC<TypographyProps<"p">> = ({ ...props }) => (
  <Typography
    variant='body1'
    component='p'
    {...props}
  />
);

export const Span: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='body1'
    component='span'
    {...props}
  />
);

export const Small: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='body1'
    component='small'
    fontSize='0.875rem'
    {...props}
  />
);

export const FormButtonText: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='button'
    fontSize='0.94rem'
    fontWeight={500}
    lineHeight='1.625rem'
    textTransform='uppercase'
    {...props}
  />
);

export const ModalTitle: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    fontSize='1.125rem'
    fontWeight={700}
    lineHeight='1.575rem'
    textTransform='capitalize'
    {...props}
  />
);

export type TextProps = React.ComponentProps<typeof Typography>;

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
