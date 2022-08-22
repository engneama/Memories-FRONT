//UI Components
import { Paper, Pagination as PaginationCom } from "@mantine/core";

const Pagination = ({ currentPage, numberOfPages, onPageChange }) => {
  return (
    <Paper mt={60} mb={20}>
      <PaginationCom
        withEdges
        withControls
        spacing="sm"
        position="center"
        page={currentPage}
        total={numberOfPages}
        onChange={onPageChange}
      />
    </Paper>
  );
};

export default Pagination;
