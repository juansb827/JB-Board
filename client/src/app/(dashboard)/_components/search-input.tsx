"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import queryString from "query-string";
import { useDebounceValue } from "usehooks-ts";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const qs = queryString.stringify(
      {
        searchTerm: debouncedValue,
      },
      { skipEmptyString: true, skipNull: true }
    );
    console.log(123, qs);
    router.push(`/?${qs}`);
  }, [debouncedValue, router]);

  return (
    <div className="group w-full max-w-[500px] flex bg-background items-center pl-8 gap-x-3 rounded-sm border border-gray-300 ">
      <Search className="group-hover:text-blue-500 transition duration-300" />
      <Input
        placeholder="Search boards"
        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
