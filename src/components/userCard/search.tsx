import { useState } from "react";
import { AutoComplete } from "../ui/autocomplete";
import { useQuery } from "@tanstack/react-query";
import fuzzysort from "fuzzysort";

export default function UserAutoComplete({setCurrentUser} : {setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>}) {
    const [selectedValue, _setSelectedValue] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
  
    const { data, isLoading } = useQuery({
      queryKey: ['users', searchValue],
      queryFn: async () => {
        
        const response = await fetch(`http://localhost:6900/api/emailSearch?email=${searchValue}`);

        const data = await response.json();

        const sampleResponse = data.email;
        if (searchValue == "") {
          return []
        }

        return (searchValue) ? 
          fuzzysort.go(searchValue, sampleResponse, {key: 'label'}).map(x => x.obj) : 
          sampleResponse;
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