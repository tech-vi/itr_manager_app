import { ButtonGroup, Button } from "react-bootstrap";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PropTypes from "prop-types";

const SimplePagination = ({ table }) => {
  return (
    <>
      <ButtonGroup aria-label="Basic example" style={{ width: "10px" }}>
        <Button
          variant="outline-secondary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <LuChevronLeft className="fs-5" />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <LuChevronRight className="fs-5" />
        </Button>
      </ButtonGroup>
    </>
  );
};

SimplePagination.propTypes = {
  table: PropTypes.object,
};

export default SimplePagination;
