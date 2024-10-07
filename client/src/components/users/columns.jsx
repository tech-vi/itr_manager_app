import { convertUTCtoIST } from "../../utils/helper";
import RowActions from "./RowActions";
export const columns = [
  {
    accessorKey: "serialNo",
    header: "#",
    cell: (info) => info.row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "fname",
    header: "First Name",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
  {
    accessorKey: "lname",
    header: "Last Name",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ getValue }) => {
      const isAdmin = getValue();
      return <span>{isAdmin ? "Admin" : "Staff"}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ getValue }) => {
      const isVerified = getValue();
      return <span>{isVerified ? "Yes" : "No"}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => <span>{convertUTCtoIST(getValue())}</span>,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => <span>{convertUTCtoIST(getValue())}</span>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
    enableSorting: false,
  },
  // {
  //   accessorKey: "_id",
  //   header: "ID",
  //   enableSorting: false,
  // },
];
