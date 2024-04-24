import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import TWButton from "./forms/Button";

interface TWTableProps {
  data: any[];
  columns: any[];
  actions?: boolean;
  search?: boolean;
  onEdit?: (item: any) => void;
  onShow?: (item: any) => void;
  onAdd?: () => void;
}

export default function TWTable({
  data,
  columns,
  actions = false,
  search = true,
  onAdd,
  onEdit,
  onShow,
}: TWTableProps) {
  return (
    <div className="mt-4">
      <div className="-m-1.5 overflow-x-auto w-full">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
            <div
              className={`flex items-center p-3 ${
                search ? "justify-between" : "justify-end"
              }`}
            >
              {search && (
                <div className="flex items-center gap-2 border rounded-lg has-[:focus]:border-red-600 py-1 px-2 text-slate-800">
                  <IconSearch size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher"
                    className="w-72 focus:outline-none rounded-lg"
                  />
                </div>
              )}
              <TWButton
                text="Ajouter un nouveau parc"
                type="button"
                onClick={() => onAdd && onAdd()}
                icon={<IconPlus size={18} />}
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr className="bg-slate-50">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-slate-800 uppercase dark:text-neutral-500"
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-slate-800 uppercase dark:text-neutral-500 text-right"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data.map((item) => (
                  <tr key={item.id}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                      >
                        {item[column.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-3 whitespace-nowrap flex gap-2 justify-end">
                        <button
                          onClick={() => onEdit && onEdit(item)}
                          className="bg-slate-200/50 py-1 px-3 text-slate-800 rounded-full flex items-center gap-1 text-sm"
                        >
                          <IconEdit size={18} /> Modifier
                        </button>
                        <button
                          onClick={() => onShow && onShow(item)}
                          className="bg-slate-200/50 py-1 px-3 text-slate-800 rounded-full flex items-center gap-1 text-sm"
                        >
                          <IconEye size={18} /> Voir sur Thrills
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="flex justify-between items-center px-6 py-3">
              <p className="text-slate-500 text-sm">
                Affichage de{" "}
                <span className="text-slate-800 font-medium">1-10</span> sur{" "}
                <span className="text-slate-800 font-medium">1 859</span>
              </p>
              <div className="flex gap-3 items-center">
                <p className="text-slate-500 text-sm">
                  Page <span className="text-slate-800 font-medium">1</span> sur{" "}
                  <span className="text-slate-800 font-medium">189</span>
                </p>
                <div className="border rounded-lg flex items-center">
                  <button className="border-e py-1 px-2 text-slate-800 rounded-s-lg outline-none">
                    <IconChevronLeftPipe size={16} />
                  </button>
                  <button className="border-e py-1 px-2 text-slate-800 outline-none">
                    <IconChevronLeft size={16} />
                  </button>

                  <button className="border-e py-1 px-2 text-slate-800 outline-none">
                    <IconChevronRight size={16} />
                  </button>

                  <button className="py-1 px-2 text-slate-800 outline-none">
                    <IconChevronRightPipe size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
