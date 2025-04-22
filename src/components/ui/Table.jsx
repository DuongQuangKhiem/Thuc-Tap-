import React from "react";

export const Table = ({ children, className, ...props }) => (
  <table className={className} {...props}>{children}</table>
);

export const TableHead = ({ children, className, ...props }) => (
  <thead className={className} {...props}>{children}</thead>
);

export const TableRow = ({ children, className, ...props }) => (
  <tr className={className} {...props}>{children}</tr>
);

export const TableCell = ({ children, className, ...props }) => (
  <td className={className} {...props}>{children}</td>
);

export const TableBody = ({ children, className, ...props }) => (
  <tbody className={className} {...props}>{children}</tbody>
);


export default Table;
