import styled from "styled-components";
import { useFavourites } from "../../hooks/useFavourites";

const StyledButton = styled.button`
  overflow: hidden;
  width: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "140px" : "60px"};
  margin-top: 30px;
  height: 40px;
  border-radius: 20px;
  padding: 0 23px;
  background-color: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "transparent" : "white"};
  border: 1px solid white;
  font-weight: bold;
  color: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "white" : "var(--global-color)"};
  cursor: pointer;
  transition: width 0.5s;
`;
type TFavouriteButtonProps = {
  imageId: string;
};

export const HeartSpan = <span>&#x2665;</span>;

export const FavouriteButton = ({ imageId }: TFavouriteButtonProps) => {
  const [favourites, toggleFavourite] = useFavourites();
  const isFavourite = favourites.includes(imageId);
  const label = isFavourite ? HeartSpan : "Favourite";
  return (
    <StyledButton
      isFavourite={isFavourite}
      onClick={() => toggleFavourite(imageId)}
    >
      {label}
    </StyledButton>
  );
};
