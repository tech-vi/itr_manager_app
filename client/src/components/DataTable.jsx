import { useState } from "react";
import { Button, Col, Form, Row, Stack, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  AdvancedPagination,
  ColumnVisibilityFilter,
  SearchFilter,
  SimplePagination,
} from ".";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";
import { LuChevronsUpDown } from "react-icons/lu";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";

import { utils, writeFile } from "xlsx";
import { convertUTCtoIST } from "../utils/helper.js";

const DataTable = ({ data, columns, isClient }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // filterFns: {
    //   customFilterFn: (row, columnId, filterValue) => {
    //     if (!filterValue) return true;
    //     return row.original[columnId]?._id === filterValue;
    //   },
    // },

    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    initialState: {
      columnFilters: [],
      pagination: {
        pageSize: 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  // console.log("columnFilters", columnFilters);
  // console.log("globalFilter", globalFilter);

  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalRows = table.getFilteredRowModel().rows.length;

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows.map((row, i) => ({
      "S.No": i + 1,
      "PAN Number": row.original?.pan_number,
      "Name as per PAN": row.original?.client_name,
      Password: row.original?.password,
      "Mobile Number": row.original?.mobile_number,
      "ITR Form Type": row.original?.itr_form_type?.title,
      "ITR Form Status": row.original?.itr_form_status?.title,
      "Financial Year": row.original?.financial_year?.title,
      "Assessment Year": row.original?.assessment_year,
      "Fee Status": row.original?.fee_status?.title,
      "ITR Form Mode": row.original?.revised ? "Revised" : "Original",
      "Added By": `${row.original?.added_by?.fname} ${row.original?.added_by?.lname}`,
      "Edited By": row.original?.edited_by
        ? `${row.original?.edited_by?.fname} ${row.original?.edited_by?.lname}`
        : "",
      "Added At": convertUTCtoIST(row.original?.createdAt),
      "Edited At": convertUTCtoIST(row.original?.updatedAt),
    }));

    const worksheet = utils.json_to_sheet(rows);

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Clients Database");

    writeFile(workbook, "clients_data.xlsx");
  };

  // useEffect(() => {
  //   setColumnFilters(() => {
  //     const filters = [
  //       financialYearFilter && {
  //         id: "financial_year",
  //         value: financialYearFilter,
  //       },
  //       itrFormTypeFilter && { id: "itr_form_type", value: itrFormTypeFilter },
  //       itrFormStatusFilter && {
  //         id: "itr_form_status",
  //         value: itrFormStatusFilter,
  //       },
  //       feeStatusFilter && { id: "fee_status", value: feeStatusFilter },
  //     ].filter(Boolean);
  //     return filters;
  //   });
  // }, [
  //   financialYearFilter,
  //   itrFormTypeFilter,
  //   itrFormStatusFilter,
  //   feeStatusFilter,
  // ]);

  return (
    <div>
      <Row className="mb-3">
        <Col xs={12} md={4} lg={3} className="mb-3">
          <SearchFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Stack
            direction="horizontal"
            className="align-items-center justify-content-between"
          >
            <Form.Select
              style={{ width: "auto" }}
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
              <option key={"all"} value={totalRows}>
                {"All"}
              </option>
            </Form.Select>
          </Stack>
        </Col>
        <Col xs={12} md={4} lg={3} className="d-md-none d-lg-block"></Col>
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Stack direction="horizontal" className="justify-content-between">
            {isClient && (
              <>
                <Button variant="success" onClick={handleExport}>
                  <PiMicrosoftExcelLogoDuotone /> Download
                </Button>
                <ColumnVisibilityFilter table={table} />
              </>
            )}
          </Stack>
        </Col>
      </Row>

      <div className="table-responsive" style={{ minHeight: "320px" }}>
        <Table className="table table-hover">
          <thead className="table-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      whiteSpace: "nowrap",
                      ...(header.column.getCanSort()
                        ? { cursor: "pointer" }
                        : {}),
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {header.column.getIsSorted() === "asc" ? (
                      <FcAlphabeticalSortingAz className="mx-3" />
                    ) : header.column.getIsSorted() === "desc" ? (
                      <FcAlphabeticalSortingZa className="mx-3" />
                    ) : (
                      header.column.getCanSort() && (
                        <LuChevronsUpDown className="mx-3" />
                      )
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="align-middle">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  style={{ background: row.getIsSelected() ? "#eee" : "#fff" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ whiteSpace: "nowrap" }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns?.length}
                  className="text-center p-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {"No results."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Stack className="mt-3">
        {selectedRows > 0 ? (
          <p>
            {selectedRows} of {totalRows} row(s) selected.
          </p>
        ) : (
          <p>{totalRows} record(s) are found.</p>
        )}
        <p>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        {isClient ? (
          <AdvancedPagination table={table} />
        ) : (
          <SimplePagination table={table} />
        )}
      </Stack>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  isClient: PropTypes.bool,
};

export default DataTable;
