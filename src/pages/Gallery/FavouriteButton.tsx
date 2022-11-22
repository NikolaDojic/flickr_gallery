import styled from "styled-components";
import { useFavourites } from "../../hooks/useFavourites";

const StyledButton = styled.button`
  border-radius: 20px;
  border: 1px solid white;
  cursor: pointer;
  font-weight: bold;
  height: 40px;
  margin-top: 30px;
  overflow: hidden;
  padding: 0 23px;
  transition: width 0.5s;
  background-color: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "transparent" : "white"};
  color: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "white" : "var(--global-color)"};
  width: ${({ isFavourite }: { isFavourite: boolean }) =>
    !isFavourite ? "140px" : "60px"};
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
