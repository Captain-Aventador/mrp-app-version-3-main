interface TableHeaderProps {
  showPriceColumns?: boolean;
}

export function TableHeader({ showPriceColumns = true }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">#</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Item</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Part ID</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Quantity</th>
        {showPriceColumns && (
          <>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Price per Unit</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Total Price</th>
          </>
        )}
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">Actions</th>
      </tr>
    </thead>
  );
}