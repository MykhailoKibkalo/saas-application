import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiDownload, FiSearch } from 'react-icons/fi';

interface DataTableProps {
    title: string;
    description?: string;
    data: {product: string, revenue: string, customers: number, growth: string }[];
    columns: { key: string; label: string }[];
}

export function DataTable({ title, description, data, columns }: DataTableProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle>{title}</CardTitle>
                        {description && <p className="text-sm text-secondary-500">{description}</p>}
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="py-2 pl-10 pr-4 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            <FiSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                                size={18}
                            />
                        </div>
                        <Button variant="outline" className="flex items-center">
                            <FiDownload className="mr-2" /> Export
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-secondary-50 border-b border-secondary-200">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 text-left text-sm font-medium text-secondary-700"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b border-secondary-200 hover:bg-secondary-50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${rowIndex}-${column.key}`}
                                        className="px-4 py-3 text-sm text-secondary-700"
                                    >
                                        {row[column.key as keyof {product: string, revenue: string, customers: number, growth: string }]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}