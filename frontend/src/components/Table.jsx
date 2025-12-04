import deleteIcon from "@iconify/icons-mdi/delete";
import editIcon from "@iconify/icons-mdi/pencil";
import { Icon } from "@iconify/react";
import { formatValue } from "../helper/helper";

export default function Table({ columns, data, idAccessor, onDelete, onEdit }) {
  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (row) => {
    onEdit(row);
  };
  return (
    <div className="overflow-x-auto">
      <table className="bg-white border border-gray-200 min-w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-2 font-semibold text-sm text-left uppercase"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 font-semibold text-sm text-left uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row[idAccessor]} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-2 text-sm">
                  {formatValue(row[col.accessor], col.type)}
                </td>
              ))}
              <td className="flex justify-center items-center mx-auto">
                <button type="button" onClick={() => handleEdit(row)}>
                  <Icon icon={editIcon} width="18" height="18" />
                </button>
                <button type="button" onClick={() => handleDelete(row)}>
                  <Icon icon={deleteIcon} width="18" height="18" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
