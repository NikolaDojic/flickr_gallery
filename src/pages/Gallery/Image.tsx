import styled from "styled-components";
import { TPhoto } from "../../types";
import { FavouriteButton } from "./FavouriteButton";

const StyledImageWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 266px;
  align-self: center;
  overflow: hidden;
  margin: 12px;
  border-radius: 5px;
  box-shadow: 13px 13px 8px -14px rgba(0, 0, 0, 0.75);
  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const StyledImageDetails = styled.div`
  background-color: black;
  opacity: 0;
  color: white;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  z-index: 25;
  justify-content: end;
  padding: 5px 5px 15px 5px;
  &:hover {
    opacity: 0.6;
  }
`;

const Delimiter = styled.div`
  min-width: 80px;
  min-height: 1px;
  border: 1px solid white;
  margin: 5px 0;
`;

const Title = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

export const Image = ({ id, ownername, url_m, url_o, title }: TPhoto) => {
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
