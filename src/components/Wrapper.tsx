import React from "react";
import { Box, Stack } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  children?: any;
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    // <Box style={{ background: "#DAE0E6" }} h="100vh">
    <Box
      pt={20}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "340px"}
      w="100%"
    >
      {children}
    </Box>
    // </Box>
  );
};
