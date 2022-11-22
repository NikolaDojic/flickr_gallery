import styled from "styled-components";
import { TPhoto } from "../../types";
import { FavouriteButton } from "./FavouriteButton";

const StyledImageWrapper = styled.div`
  align-self: center;
  border-radius: 5px;
  box-shadow: 13px 13px 8px -14px rgba(0, 0, 0, 0.75);
  height: 200px;
  margin: 12px;
  overflow: hidden;
  position: relative;
  width: 266px;
  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const StyledImageDetails = styled.div`
  align-items: center;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: end;
  opacity: 0;
  padding: 5px 5px 15px 5px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 25;
  &:hover {
    opacity: 0.6;
  }
`;

const Delimiter = styled.div`
  border: 1px solid white;
  margin: 5px 0;
  min-height: 1px;
  min-width: 80px;
`;

const Title = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

export const Image = ({ id, ownername, title, url_m, url_o }: TPhoto) => {
  return (
    <StyledImageWrapper>
      <img src={url_m} alt={title} />
      <StyledImageDetails data-testid="img-cover">
        <Title
          data-testid="img-title"
          onClick={() => window.open(url_o || url_m, "_blank")}
        >
          {title || ownername}
        </Title>
        <Delimiter />
        <span>
          <i>{ownername}</i>
        </span>
        <FavouriteButton imageId={id} />
      </StyledImageDetails>
    </StyledImageWrapper>
  );
};
