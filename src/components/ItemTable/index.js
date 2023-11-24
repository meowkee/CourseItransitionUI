import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/consts.js";

export const ItemTable = ({ items, selectedItems, setSelectedItems, toggleSelection, collections }) => {
    const [selectAll, setSelectAll] = useState(false);
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : items.items.map((item) => item.id));
    };
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-r text-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </th>
          <th className="py-2 px-4 border-b border-r text-left">
            ID
          </th>
          <th className="py-2 px-4 border-b border-r text-left">
            Name
          </th>
          <th className="py-2 px-4 border-b border-r text-left">
            Tags
          </th>
          {collections.currentCollection.fields?.map(
            (field) => (
              <th
                key={field.id}
                className="py-2 px-4 border-b border-r text-left"
              >
                {field.name}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {items.items.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b border-r text-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
              />
            </td>
            <td className="py-2 px-4 border-b border-r text-right">
              {item.id}
            </td>
            <td className="py-2 px-4 border-b border-r text-left">
              <Link
                to={`${Routes.ITEM}/${item.id}`}
                className="text-blue-500 hover:underline text-lg font-semibold mb-2 block"
              >
                {item.name}
              </Link>
            </td>
            <td className="py-2 px-4 border-b border-r text-left">
              {item.tags?.map((tag) => tag.name).join(", ")}
            </td>
            {collections.currentCollection.fields?.map(
              (field) => (
                <td
                  key={field.id}
                  className="py-2 px-4 border-b border-r text-left"
                >
                  {item.valuefields?.find(
                    (vf) => vf.fieldId === field.id
                  )?.value || ""}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};