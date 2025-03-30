import React from "react";

export const Table = ({ children, className }) => (
  <table className={className}>{children}</table>
);

export const TableHead = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

export const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableCell = ({ children, className }) => (
  <td className={className}>{children}</td>
);

export const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);

export default Table;
