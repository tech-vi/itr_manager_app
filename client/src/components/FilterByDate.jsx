import { Button, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";

import { convertUTCtoISTDate } from "../utils/helper";

const FilterByDate = ({
  columnFilters,
  setColumnFilters,
  columnId,
  label,
  column,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleFilterSelection = (dateFilter) => {
    setColumnFilters((prevFilters) => {
      const existingFilter = prevFilters.find(
        (prevFilter) => prevFilter.id === columnId
      );

      if (existingFilter) {
        return prevFilters.map((filter) =>
          filter.id === columnId ? { ...filter, value: dateFilter } : filter
        );
      } else {
        return [...prevFilters, { id: columnId, value: dateFilter }];
      }
    });
    setShowDropdown(false);
  };

  const clearFilter = () => {
    setColumnFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== columnId)
    );
    setShowDropdown(false);
    setSelectedDate(null);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const formattedDate = convertUTCtoISTDate(date);
    handleFilterSelection(formattedDate);
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

            <div className="px-3 py-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  handleDateSelection(e.target.value);
                  // console.log(e.target.value);
                }}
                className="form-control"
                placeholder="Select date"
              />
            </div>
          </Dropdown.Menu>
        )}
      </div>
    </>
  );
};

FilterByDate.propTypes = {
  columnFilters: PropTypes.array,
  setColumnFilters: PropTypes.func,
  columnId: PropTypes.string,
  label: PropTypes.string,
  column: PropTypes.object,
};

export default FilterByDate;
