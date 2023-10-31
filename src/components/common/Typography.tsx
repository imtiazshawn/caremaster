import { Typography, TypographyProps } from "@mui/material";

export const H1: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h1'
    fontSize='32px'
    fontWeight={600}
    {...props}
  />
);

export const H2: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h2'
    fontSize='24px'
    fontWeight={600}
    {...props}
  />
);

export const H3: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h3'
    fontSize='20px'
    fontWeight={600}
    {...props}
  />
);

export const H4: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h4'
    fontSize='18px'
    lineHeight={1}
    fontWeight={500}
    {...props}
  />
);

export const H5: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h5'
    fontSize='16px'
    fontWeight={500}
    {...props}
  />
);

export const H6: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='h6'
    fontSize='14px'
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
    fontSize='14px'
    {...props}
  />
);

export const FormButtonText: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    variant='button'
    fontSize='15px'
    fontWeight={500}
    lineHeight='26px'
    textTransform='uppercase'
    {...props}
  />
);

export const ModalTitle: React.FC<TypographyProps> = ({ ...props }) => (
  <Typography
    fontSize='18px'
    fontWeight={700}
    lineHeight='25.2px'
    textTransform='capitalize'
    {...props}
  />
);

export type TextProps = React.ComponentProps<typeof Typography>;

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
