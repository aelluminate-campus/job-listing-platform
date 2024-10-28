import { Table } from "@/components/ui/table"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for contracts
const contracts = [
  {
    id: 1,
    title: "Web Application Development",
    company: "ITSquare Hub",
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    status: "Active",
  },
  {
    id: 2,
    title: "UX/UI Redesign Project",
    company: "Scrubbed",
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Printer System Overhaul",
    company: "Printcom",
    startDate: "2024-03-01",
    endDate: "2024-12-01",
    status: "Completed",
  },
];

export default function ContractsPage() {
  return (
    <main className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold mb-6">My Contracts</h1>
        <Card>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Title</th> 
                  <th className="text-center">Company</th>
                  <th className="text-center">Start Date</th>
                  <th className="text-center">End Date</th>
                  <th className="text-center">Status</th> 
                  <th className="text-center">Actions</th> 
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id}>
                    <td className="text-center">{contract.title}</td> 
                    <td className="text-center">{contract.company}</td>
                    <td className="text-center">
                      {new Date(contract.startDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(contract.endDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">{contract.status}</td> 
                    <td className="text-center">
                      <Button className="bg-gray-500 text-white hover:bg-gray-700 transition-colors">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
