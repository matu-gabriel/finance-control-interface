import { ComponentProps, forwardRef, ReactNode } from "react";
import { Container, IconWrapper } from "./style";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  variant?: "black" | "dark";
  icon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { label, variant = "black", icon, ...props },
  ref
) {
  return (
    <Container $variant={variant} hasIcon={!!icon}>
      {label && <label>{label}</label>}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <input ref={ref} {...props} />
      </div>
    </Container>
  );
});
