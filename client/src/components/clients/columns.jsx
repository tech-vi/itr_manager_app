import { convertUTCtoIST } from "../../utils/helper";
import RowActions from "./RowActions";
import FilterBy from "../FilterBy";
import { Form } from "react-bootstrap";

// # higher order function method

export const generateColumns = ({
  financialYearData,
  itrFormTypeData,
  itrFormStatusData,
  feeStatusData,
}) => [
  {
    id: "select",
    header: ({ table }) => (
      <Form.Check
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),

    cell: ({ row }) => (
      <Form.Check
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "Serial No",
    header: "#",
    cell: (info) => info.row.index + 1,
    enableSorting: false,
  },
  {
    header: "PAN Number",
    accessorFn: (row) => `${row.pan_number}`,
  },
  {
    header: "Name as per PAN",
    accessorFn: (row) => `${row.client_name}`,
  },
  {
    header: "Mobile Number",
    accessorFn: (row) => `${row.mobile_number}`,
    enableSorting: false,
  },
  {
    header: "Password",
    accessorFn: (row) => `${row.password}`,
    enableSorting: false,
  },
  {
    // header: "Financial Year",
    header: ({ table, column }) => {
      const { columnFilters } = table.getState();
      const { setColumnFilters } = table;
      return (
        <FilterBy
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnId="financial_year"
          data={financialYearData}
          label="Financial Year"
          column={column}
        />
      );
    },
    accessorKey: "financial_year",
    accessorFn: (row) => `${row.financial_year?.title}`,
    // filterFn: "customFilterFn",
    enableSorting: false,
  },
  {
    header: "Assessment Year",
    accessorFn: (row) => `${row.assessment_year}`,
    enableSorting: false,
  },
  {
    // header: "ITR Form Type",
    header: ({ table, column }) => {
      const { columnFilters } = table.getState();
      const { setColumnFilters } = table;
      return (
        <FilterBy
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnId="itr_form_type"
          data={itrFormTypeData}
          label="ITR Form Type"
          column={column}
        />
      );
    },
    accessorKey: "itr_form_type",
    accessorFn: (row) => `${row.itr_form_type?.title}`,
    // filterFn: "customFilterFn",
    enableSorting: false,
  },
  {
    // header: "ITR Form Status",
    header: ({ table, column }) => {
      const { columnFilters } = table.getState();
      const { setColumnFilters } = table;
      return (
        <FilterBy
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnId="itr_form_status"
          data={itrFormStatusData}
          label="ITR Form Status"
          column={column}
        />
      );
    },
    accessorKey: "itr_form_status",
    accessorFn: (row) => `${row.itr_form_status?.title}`,
    // filterFn: "customFilterFn",
    enableSorting: false,
  },
  {
    // header: "Fee Status",
    header: ({ table, column }) => {
      const { columnFilters } = table.getState();
      const { setColumnFilters } = table;
      return (
        <FilterBy
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnId="fee_status"
          data={feeStatusData}
          label="Fee Status"
          column={column}
        />
      );
    },
    accessorKey: "fee_status",
    accessorFn: (row) => `${row.fee_status?.title}`,
    // filterFn: "customFilterFn",
    enableSorting: false,
  },
  {
    header: "ITR Form Mode",
    accessorFn: (row) => (row.revised ? "Revised" : "Original"),
    enableSorting: false,
  },
  {
    header: "Added By",
    accessorFn: (row) => {
      return row.added_by
        ? `${row.added_by?.fname} ${row.added_by?.lname}`
        : "";
    },
    enableSorting: false,
  },
  {
    header: "Edited By",
    accessorFn: (row) => {
      return row.edited_by
        ? `${row.edited_by?.fname} ${row.edited_by?.lname}`
        : "";
    },
    enableSorting: false,
  },
  {
    header: "Created At",
    accessorFn: (row) => `${convertUTCtoIST(row.createdAt)}`,
  },
  {
    header: "Updated At",
    accessorFn: (row) => `${convertUTCtoIST(row.updatedAt)}`,
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
    enableSorting: false,
  },
];
