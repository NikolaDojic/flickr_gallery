import styled from "styled-components";
import { TPhoto } from "../../types";
import { FavouriteButton } from "./FavouriteButton";

const StyledImageWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 266px;
  align-self: center;
  overflow: hidden;
  margin: 10px;
  border-radius: 5px;
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
  padding-bottom: 15px;
  &:hover {
    visibility: visible;
    opacity: 0.6;
  }
`;

const Delimiter = styled.div`
  min-width: 80px;
  min-height: 1px;
  border: 1px solid white;
  margin: 5px 0;
`;

export const Image = ({ id, ownername, url_m, url_o, title }: TPhoto) => {
  return (
    <StyledImageWrapper>
      <img src={url_m} alt={title} />
      <StyledImageDetails>
        <span>
          <b>{title}</b>
        </span>
        <Delimiter />
        <span>
          <i>{ownername}</i>
        </span>
        <FavouriteButton imageId={id} />
      </StyledImageDetails>
    </StyledImageWrapper>
  );
};
