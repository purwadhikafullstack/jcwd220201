import { Box, Flex, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import SearchBar from "../components/transactions/SearchBar";

// Own library imports

const Transactions = () => {
  // Display addresses functionality
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [loadTransactions, setLoadTransactions] = useState(false);
  const [transactionsManipulation, setTransactionsManipulation] =
    useState(false);
  const [query, setQuery] = useState(null);

  // Fetch user transactions
  // useEffect(() => {
  //   fetchTransactions(pageIndex, query).then((res) => {
  //     // Get response data
  //     const { transactions, totalPage } = res.data.data;

  //     // Store transactions
  //     setTransactions(transactions);

  //     // Prepare for pagination
  //     setTotalPage(totalPage);

  //     // Load transactions
  //     setLoadTransactions(true);

  //     // Persist search input if exist
  //     setTransactionsManipulation(false);
  //   });
  // }, [query, pageIndex]);

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
              transactionsManipulation={transactionsManipulation}
              setQuery={setQuery}
              setPageIndex={setPageIndex}
            />
          </Stack>
          {/* {loadTransactions ? (
            <Box pt="1rem">
              {renderTransactions(
                transactions,
                pageIndex,
                setTransactions,
                setTotalPage,
                setPageIndex,
                setTransactionsManipulation
              )}
            </Box>
          ) : null} */}
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

export default Transactions;
