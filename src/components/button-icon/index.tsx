import { ComponentProps, forwardRef } from "react";
import { Container } from "./style";
import { MagnifyingGlass } from "@phosphor-icons/react";

type ButtonIconProps = ComponentProps<"button">;

export const ButtonIncon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ({ ...props }, ref) {
    return (
      <Container {...props} ref={ref}>
        <MagnifyingGlass />
      </Container>
    );
  }
);
