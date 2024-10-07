import RowActions from "./RowActions";

export const columns = [
  {
    accessorKey: "serialNo",
    header: "#",
    cell: (info) => info.row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
  {
    accessorKey: "_id",
    header: "ID",
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
    enableSorting: false,
  },
];
