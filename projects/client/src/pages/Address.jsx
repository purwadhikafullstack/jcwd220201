import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import AddressForm from "../components/address/AddressForm";
import SearchBar from "../components/address/SearchBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

// Own library imports
import fetchAddresses from "../lib/address/fetchAddresses";
import renderAddresses from "../lib/address/renderAddresses";
import EditAddressForm from "../components/address/EditAddressForm";

const Address = () => {
  // Display addresses functionality
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [loadAddress, setLoadAddress] = useState(false);
  const [addressManipulation, setAddressManipulation] = useState(false);
  const [query, setQuery] = useState(null);

  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch user addresses
  useEffect(() => {
    fetchAddresses(pageIndex, query).then((res) => {
      // Get response data
      const { addresses, totalPage } = res.data.data;

      // Store other addresses
      setAddresses(addresses);

      // Prepare for pagination
      setTotalPage(totalPage);

      // Load addresses
      setLoadAddress(true);

      // Persist search input if exist
      setAddressManipulation(false);
    });
  }, [query, pageIndex, defaultAddress]);

  return (
    <Flex h="100%" direction="column" justifyContent="space-between">
      <Navbar />
      <Box height={["78.41rem", "85.48rem", "75.6rem", "75.6rem"]}>
        <Flex
          direction="column"
          alignItems="center"
          mt={["0.5rem", "4rem"]}
          border={["none", "1px solid rgb(219, 222, 226)"]}
          borderRadius="0.5rem"
          p={[
            "3rem 1rem 1rem",
            "3rem 1rem 1.96rem",
            "3rem 1rem 2rem",
            "3rem 2rem 2rem",
          ]}
          w={{
            base: "17.73rem",
            sm: "30.367rem",
            md: "47.387rem",
            lg: "60.625rem",
          }}
          mx="auto"
        >
          <Stack
            direction={["column", "column", "row"]}
            justifyContent="space-between"
            spacing={["0.25rem", "0.5rem"]}
            width={["15.2295rem", "25.7412rem", "42.7617rem", "56.125rem"]}
          >
            <SearchBar
              addressManipulation={addressManipulation}
              setQuery={setQuery}
              setPageIndex={setPageIndex}
            />
            <Button
              borderRadius="0.5rem"
              colorScheme="teal"
              fontWeight="bold"
              fontSize={["0.6875rem", "0.875rem"]}
              height={["2.0352rem", "2.375rem"]}
              onClick={onOpen}
              px="1rem"
              width={["100%", "100%", "auto", "auto"]}
            >
              Tambah Alamat Baru
            </Button>
          </Stack>

          {loadAddress
            ? renderAddresses(
                addresses,
                pageIndex,
                setDefaultAddress,
                setAddresses,
                setTotalPage,
                setPageIndex,
                setAddressManipulation
              )
            : null}

          <AddressForm
            fetchAddresses={fetchAddresses}
            pageIndex={pageIndex}
            isOpen={isOpen}
            onClose={onClose}
            setAddresses={setAddresses}
            setTotalPage={setTotalPage}
            setPageIndex={setPageIndex}
            setAddressManipulation={setAddressManipulation}
          />
        </Flex>
        <ReactPaginate
          breakLabel="..."
          containerClassName="address-pagination-buttons"
          forcePage={pageIndex}
          nextLabel="Berikutnya"
          onPageChange={({ selected }) => {
            setPageIndex(selected);
          }}
          pageRangeDisplayed={5}
          pageClassName="address-pagination-pages"
          pageCount={totalPage}
          previousLabel="Sebelumnya"
          renderOnZeroPageCount={null}
        />
      </Box>
      <Footer />
    </Flex>
  );
};

{
  /* <Button
        backgroundColor="white"
        border="1px solid"
        borderRadius="0.5rem"
        color="rgb(0, 128, 128)"
        colorScheme="whiteAlpha"
        fontWeight="bold"
        fontSize="0.875rem"
        height="2.5rem"
        px="1rem"
      >
        Tambah Alamat Baru
      </Button> */
}

export default Address;
