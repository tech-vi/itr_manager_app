import { Button, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";

const FilterBy = ({
  columnFilters,
  setColumnFilters,
  columnId,
  data,
  label,
  column,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // console.log(columnFilters);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleFilterSelection = (status) => {
    setColumnFilters((prevFilters) => {
      const existingFilter = prevFilters.find(
        (prevFilter) => prevFilter.id === columnId
      );

      if (existingFilter) {
        return prevFilters.map((filter) =>
          filter.id === columnId ? { ...filter, value: status } : filter
        );
      } else {
        return [...prevFilters, { id: columnId, value: status }];
      }
    });
    setShowDropdown(false);
  };

  const clearFilter = () => {
    setColumnFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== columnId)
    );
    setShowDropdown(false);
  };

  return (
    <>
      <div className="position-relative d-flex align-items-center">
        <span>{label}</span>

        {column.getCanFilter() && (
          <Button
            variant="link"
            className="p-0"
            onClick={toggleDropdown}
            style={{ marginLeft: "8px" }}
          >
            <BsFilter
              style={{ color: column.getIsFiltered() ? "blue" : "black" }}
            />
          </Button>
        )}

        {showDropdown && (
          <Dropdown.Menu
            show
            className="position-absolute"
            style={{ top: "30px", zIndex: 1000 }}
          >
            <Dropdown.Item onClick={clearFilter}>Clear Filter</Dropdown.Item>
            {data.map((feeStatus) => (
              <Dropdown.Item
                key={feeStatus._id}
                onClick={() => handleFilterSelection(feeStatus.title)}
              >
                {feeStatus.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </div>
    </>
  );
};

FilterBy.propTypes = {
  columnFilters: PropTypes.array,
  setColumnFilters: PropTypes.func,
  columnId: PropTypes.string,
  data: PropTypes.array,
  label: PropTypes.string,
  column: PropTypes.object,
};

export default FilterBy;
