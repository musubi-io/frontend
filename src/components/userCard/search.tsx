import { useState } from "react";
import { AutoComplete } from "../ui/autocomplete";
import { useQuery } from "@tanstack/react-query";

export default function UserAutoComplete({setCurrentUser} : {setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>}) {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
  
    const { data, isLoading } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second delay
        return [
          { value: '1', label: 'John Doe' },
          { value: '2', label: 'Jane Smith' },
          { value: '3', label: 'Alice Johnson' },
        ];
      }
    });
  
    return (
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={setCurrentUser}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data || []}
        isLoading={isLoading}
        placeholder="Search users..."
      />
    );
  }