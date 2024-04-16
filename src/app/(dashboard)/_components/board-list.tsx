import React from "react";

interface BoardListProps {
  teamId: string;
  searchParams: {
    favorites: boolean;
    searchTerm?: string;
  };
}
const BoardList = ({
  searchParams: { favorites, searchTerm },
}: BoardListProps) => {
  const data = [];
  if (!data?.length) {
    if (favorites) {
      return <div>No favorites</div>;
    }
    if (searchTerm) {
      return <div>No results for `{searchTerm}`</div>;
    }
    return <div>No boards</div>;
  }
  return <div>BoardList</div>;
};

export default BoardList;
