import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

// { columnFilters, setColumnFilters }

const SearchFilter = ({ globalFilter, setGlobalFilter }) => {
  // const filterValue =
  //   columnFilters?.find((filter) => filter.id === "title")?.value || "";

  // const onFilterChange = (id, value) => {
  //   setColumnFilters((prev) =>
  //     prev.length
  //       ? prev.map((filter) =>
  //           filter.id === id ? { ...filter, value } : filter
  //         )
  //       : [{ id, value }]
  //   );
  // };

  return (
    <>
      <InputGroup>
        <Form.Control
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          // value={filterValue}
          // onChange={(e) => onFilterChange("title", e.target.value)}
        />
        <InputGroup.Text
          onClick={() => setGlobalFilter("")}
          style={{ cursor: "pointer" }}
        >
          {globalFilter === "" ? <IoSearch /> : <MdClose />}
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

SearchFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
};

export default SearchFilter;
