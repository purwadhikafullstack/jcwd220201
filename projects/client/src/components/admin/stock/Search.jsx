import {
  Input,
  InputGroup,
  InputRightAddon,
  Box,
  Button,
  Flex,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
const Search = () => {
  return (
    <>
      <Flex
        borderRadius="0.5rem"
        align="stretch"
        overflow="hidden"
        width={["100%", "100%", "43.34%", "33.094%"]}
        height="2.375rem"
        direction="row"
      >
        <InputGroup borderColor="rgb(243, 244, 245)">
          <Input
            id="query"
            type="text"
            //   {...formik.getFieldProps("query")}
            variant="filled"
            placeholder="Cari Warehouse"
            _placeholder={{ color: "rgb(169, 168, 172)" }}
            height={["85.714%", "100%"]}
            color="rgba(49, 53, 59, 0.96)"
            fontSize={["0.75rem", "0.875rem"]}
            lineHeight="1.25rem"
            padding="0.5rem 0.75rem"
            _hover="none"
            focusBorderColor="none"
          />
          <InputRightAddon
            padding="0"
            _hover={{ backgroundColor: "rgb(230, 231, 232)" }}
            height={["85.714%", "100%"]}
          >
            <Button
              width={["100%", "54.032%"]}
              height="100%"
              padding="0"
              backgroundImage="assets/address/search-icon.svg"
              backgroundSize="1.5rem"
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundColor="rgb(243, 244, 245)"
              // onClick={formik.handleSubmit}
              _hover={{ backgroundColor: "rgb(230, 231, 232)" }}
              _active="none"
            />
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </>
  )
}

export default Search
