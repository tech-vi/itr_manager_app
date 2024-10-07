import { Pagination } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const AdvancedPagination = ({ table }) => {
  const [currentPage, setCurrentPage] = useState(
    table.getState().pageIndex + 1 || 1
  );
  const totalPages = table.getPageCount();

  const handlePageChange = (pageNumber) => {
    table.setPageIndex(pageNumber - 1);
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Pagination id="client-pagination">
        {/* First Page */}
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          title="First"
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous"
        />

        {/* Always show the first page */}
        <Pagination.Item
          onClick={() => handlePageChange(1)}
          active={currentPage === 1}
        >
          {1}
        </Pagination.Item>

        {/* Show Ellipsis if currentPage is greater than 3 */}
        {currentPage > 3 && totalPages > 1 && <Pagination.Ellipsis />}
        {/* {currentPage > 3 && <Pagination.Ellipsis />} */}

        {/* Show the pages around the current page */}
        {currentPage > 2 && currentPage < totalPages && (
          <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </Pagination.Item>
        )}

        {/* Current Page */}
        {currentPage !== 1 && currentPage !== totalPages && (
          <Pagination.Item active>{currentPage}</Pagination.Item>
        )}

        {/* Next page after current */}
        {currentPage < totalPages - 1 && (
          <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </Pagination.Item>
        )}

        {/* Show Ellipsis if currentPage is more than 2 pages away from the last page */}
        {currentPage < totalPages - 2 && totalPages > 1 && (
          <Pagination.Ellipsis />
        )}
        {/* {currentPage < totalPages - 2 && <Pagination.Ellipsis />} */}

        {/* Always show the last page if totalPages > 1 */}
        {totalPages > 1 && (
          <Pagination.Item
            onClick={() => handlePageChange(totalPages)}
            active={currentPage === totalPages}
          >
            {totalPages}
          </Pagination.Item>
        )}
        {/* <Pagination.Item
          onClick={() => handlePageChange(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </Pagination.Item> */}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next"
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last"
        />
      </Pagination>
    </>
  );
};

AdvancedPagination.propTypes = {
  table: PropTypes.object,
};

export default AdvancedPagination;
