import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyTeamBoards from "./empty-team-boards";

interface BoardListProps {
  teamId: string;
  teamName: string;
  searchParams: {
    favorites: boolean;
    searchTerm?: string;
  };
}
const BoardList = ({
  teamName,
  searchParams: { favorites, searchTerm },
}: BoardListProps) => {
  const data = [];
  if (!data?.length) {
    if (favorites) {
      return <EmptyFavorites teamName={teamName} />;
    }
    if (searchTerm) {
      return <EmptySearch searchTerm={searchTerm} teamName={teamName} />;
    }
    return <EmptyTeamBoards teamName={teamName} />;
  }
  return <div>BoardList</div>;
};

export default BoardList;
