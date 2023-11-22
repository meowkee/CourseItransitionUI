import React, { useContext } from "react";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";

const ItemPage = observer(() => {
  const { collections } = useContext(Context);

  // Dummy data for demonstration
  const items = [
    { id: 1, name: "Item 1", tags: ["Tag1", "Tag2"], collectionId: 1 },
    { id: 2, name: "Item 2", tags: ["Tag3", "Tag4"], collectionId: 2 },
    // Add more items as needed
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Tags</th>
              {/* Add additional fields from collections here */}
              <th className="py-2 px-4 border-b">Additional Field 1</th>
              <th className="py-2 px-4 border-b">Additional Field 2</th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.tags.join(", ")}</td>
                {/* Fetch additional fields from collections based on collectionId */}
                <td className="py-2 px-4 border-b">
                  {collections.fields.name} {/* Replace with the actual field */}
                </td>
                <td className="py-2 px-4 border-b">
                  {collections.fields.anotherField} {/* Replace with the actual field */}
                </td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ItemPage;
