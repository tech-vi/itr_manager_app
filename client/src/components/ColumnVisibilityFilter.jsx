import { Button, ButtonGroup, Dropdown, Form, Stack } from "react-bootstrap";
import { BsLayoutThreeColumns } from "react-icons/bs";
import PropTypes from "prop-types";

const ColumnVisibilityFilter = ({ table }) => {
  const nonHideableColumns = ["select", "Serial No", "actions"];
  return (
    <>
      <Stack direction="horizontal" className="justify-content-end">
        <Dropdown as={ButtonGroup}>
          <Button variant="dark">
            <BsLayoutThreeColumns />
          </Button>
          <Dropdown.Toggle
            split
            drop="end"
            variant="dark"
            id="row-actions-menu"
          ></Dropdown.Toggle>

          <Dropdown.Menu
            id="col-filter"
            style={{ height: "200px", overflowY: "scroll" }}
          >
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  column.getCanHide() && !nonHideableColumns.includes(column.id)
              )
              .map((column) => {
                return (
                  <Dropdown.Item
                    key={column.id}
                    as="div"
                    className="d-flex align-items-center"
                  >
                    <Form.Check
                      type="checkbox"
                      label={column.id}
                      className="text-capitalize"
                      checked={column.getIsVisible()}
                      onChange={(e) =>
                        column.toggleVisibility(e.target.checked)
                      }
                    />
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
    </>
  );
};

ColumnVisibilityFilter.propTypes = {
  table: PropTypes.object,
};

export default ColumnVisibilityFilter;
