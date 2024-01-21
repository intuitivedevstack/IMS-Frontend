import { CompactTable } from "@table-library/react-table-library/compact";

const nodes = [
  {
    id: "0",
    name: "1",
    deadline: "Ajay Jha",
    type: "TASK",
    isComplete: 8,
    nodes: "IT",
  },
  {
    id: "0",
    name: "2",
    deadline: "Ajay Jha",
    type: "TASK",
    isComplete: 1,
    nodes: "IT",
  },
  {
    id: "0",
    name: "3",
    deadline: "Ajay Jha",

    type: "TASK",
    isComplete: 5,
    nodes: "IT",
  },
  {
    id: "0",
    name: "4",
    deadline: "Ajay Jha",
    type: "TASK",
    isComplete: 2,
    nodes: "IT",
  },
];

const COLUMNS = [
  { label: "S/N", renderCell: (item) => item.name },
  {
    label: "Student Name",
    renderCell: (item) => item.deadline,
  },
  { label: "Parent Name", renderCell: (item) => item.type },
  {
    label: "Roll Number",
    renderCell: (item) => item.isComplete,
  },
  { label: "Class/Course", renderCell: (item) => item.nodes },
];

const Component = () => {
  const data = { nodes };

  return <CompactTable columns={COLUMNS} data={data} />;
};

export default Component;
