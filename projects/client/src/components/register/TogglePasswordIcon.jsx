import { Box, Image, useMediaQuery } from "@chakra-ui/react";

const TogglePasswordIcon = ({ callback }) => {
  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  return (
    <Box>
      <Image
        src="assets/toggle-password.svg"
        alt="toggle"
        cursor="pointer"
        onClick={callback}
        width={
          isLargerThanMd ? "1.25rem" : isLargerThanSm ? "1.032rem" : "0.852rem"
        }
        height={
          isLargerThanMd ? "1.062rem" : isLargerThanSm ? "0.877rem" : "0.724rem"
        }
        mb={isLargerThanMd ? "0rem" : isLargerThanSm ? "0.437rem" : "0.844rem"}
        ml={isLargerThanMd ? "0rem" : isLargerThanSm ? "0.437rem" : "0.844rem"}
      />
    </Box>
  );
};

export default TogglePasswordIcon;
