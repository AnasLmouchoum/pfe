import classNames from "classnames";
import React from "react";
import { TableProps, TdProps, ThProps, TrProps } from "./types";

const Table = ({ thead, children, className, ...props }: TableProps) => {
  return (
    <table
      {...props}
      className={classNames(className, "tab-list float-left w-full")}
    >
      <thead className="bg-gray-50">{thead}</thead>
      <tbody className="bg-white">{children}</tbody>
    </table>
  );
};

const Tr = (props: TrProps) => <tr {...props} />;

const Th = ({ className, ...props }: ThProps) => {
  return (
    <th
      scope="col"
      {...props}
      className={classNames(
        className,
        " top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
      )}
    />
  );
};

const Td = ({ className, action = false, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={classNames(
        className,
        { "relative text-right font-medium sm:pr-6": action },
        "whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
      )}
    />
  );
};

Table.th = Th;
Table.td = Td;
Table.tr = Tr;

export default Table;
