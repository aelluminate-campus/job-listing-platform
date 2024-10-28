'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";  // Adjust the path as needed

export default function Search({ data, onSearch }: { data: any, onSearch: any }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { target: { value: string; }; }) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      // Filter out items with null users when the search term is empty
      const filteredData = data.filter((item: { client_id: any; freelance_id: any; }) => item.client_id && item.freelance_id);
      onSearch(filteredData);
    } else {
      const filteredData = data.filter((item: { client_id: any; freelance_id: any; }) => {
        const { client_id, freelance_id } = item;
        const clientFullName = `${client_id?.first_name || ""} ${client_id?.last_name || ""}`.toLowerCase();
        const freelanceFullName = `${freelance_id?.first_name || ""} ${freelance_id?.last_name || ""}`.toLowerCase();
        const clientNameMatch = client_id && clientFullName.includes(value);
        const freelanceNameMatch = freelance_id && freelanceFullName.includes(value);
        return clientNameMatch || freelanceNameMatch;
      });
      onSearch(filteredData);
    }
  };

  return (
    <div className="mb-4 pt-6 flex justify-center">
      <div className="max-w-xs w-full">
        <Input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </div>
    </div>
  );
}
