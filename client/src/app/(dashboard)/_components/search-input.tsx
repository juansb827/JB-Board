"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import queryString from "query-string";
import { useDebounceValue } from "usehooks-ts";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import { debounce } from "lodash-es";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { searchParams, setSearchParams } = useDashboardStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchParams = useCallback(
    debounce((searchTerm) => {
      setSearchParams({ searchTerm });
      const qs = queryString.stringify(
        {
          searchTerm,
        },
        { skipEmptyString: true, skipNull: true }
      );
      router.push(`/?${qs}`);
    }, 300),
    [router, setSearchParams]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSetSearchParams(e.target.value);
  };

  useEffect(() => {
    // Here we change the value of the input programatically but
    // handleChange wont we called so it wont
    // trigger a state change in the store
    setValue(searchParams.searchTerm || "");
  }, [searchParams.searchTerm]);
  // const [debouncedValue ] = useDebounceValue(value, 500, {

  // });

  // useEffect(() => {
  //   setSearchParams({
  //     searchTerm: debouncedValue,
  //   });

  //   const qs = queryString.stringify(
  //     {
  //       searchTerm: debouncedValue,
  //     },
  //     { skipEmptyString: true, skipNull: true }
  //   );
  //   router.push(`/?${qs}`);
  // }, [debouncedValue, setSearchParams, router]);

  return (
    <div className="group w-full max-w-[500px] flex bg-background items-center pl-8 gap-x-3 rounded-sm border border-gray-300 ">
      <Search className="group-hover:text-blue-500 transition duration-300" />
      <Input
        placeholder="Search boards"
        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
