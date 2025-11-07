import { Icon } from "@iconify/react";
import editIcon from "@iconify/icons-mdi/pencil";
import deleteIcon from "@iconify/icons-mdi/delete";
import { Link } from "react-router-dom";

export default function Table({
	columns,
	data,
	idAccessor,
	onDelete,
	onEdit,
	showViewMore = false,
}) {
	const handleDelete = (id) => {
		onDelete(id);
	};

	const handleEdit = (row) => {
		onEdit(row);
	};
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white border border-gray-200">
				<thead className="bg-gray-800 text-white">
					<tr>
						{columns.map((col) => (
							<th
								key={col.accessor}
								className="py-2 px-4 text-left text-sm font-semibold uppercase">
								{col.header}
							</th>
						))}
						<th className="py-2 px-4 text-left text-sm font-semibold uppercase">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{data.map((row, rowIndex) => (
						<tr
							key={row[idAccessor]}
							className="hover:bg-gray-100">
							{columns.map((col) => (
								<td
									key={col.accessor}
									className="py-2 px-4 text-sm">
									{row[col.accessor]}
								</td>
							))}
							<td className="mx-auto flex items-center justify-center">
								<button
									type="button"
									onClick={() => handleEdit(row)}>
									<Icon
										icon={editIcon}
										width="18"
										height="18"
									/>
								</button>
								<button
									type="button"
									onClick={() => handleDelete(row)}>
									<Icon
										icon={deleteIcon}
										width="18"
										height="18"
									/>
								</button>
								{showViewMore && (
									<Link
										to={`/festivals/${row.festivalID}/stages`}
										onClick={() => onView(row)}>
										<Icon
											icon="mdi:eye"
											width="18"
											height="18"
										/>
									</Link>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
