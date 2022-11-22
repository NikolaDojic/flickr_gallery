import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Error } from "../../components";
import { useGetImages } from "../../hooks/useGetImages";
import { TPhoto } from "../../types";
import { Image } from "./Image";

// due to flex properties, there is no need for breakpoints
// to manage displayed images, we still want to adjust padding, tho
const ImagesWrapper = styled.div`
  background-color: var(--gray);
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  overflow: auto;
  padding: 24px 12%;
  width: 100%;
  ${({ isLoading }: { isLoading: boolean }) =>
    isLoading ? "cursor: wait;" : ""}
  @media screen and (max-width: 1200px) {
    padding: 24px;
  }
`;

export const Gallery = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<TPhoto[]>([]);
  const { loading, error, data } = useGetImages({ page });
  useEffect(() => {
    if (data) {
      const { photo } = data.photos;
      setImages((images) => {
        const imageIds = images.map((image) => image.id);
        return [
          ...images,
          ...photo.filter((image) => !imageIds.includes(image.id)),
        ];
      });
    }
  }, [data]);

  //TODO render only visible images
  //one way to do it is by using a library such as react-window
  return (
    <Container data-testid="gallery-page">
      <Error message={(error as Error)?.message} />
      <ImagesWrapper
        data-testid="images-wrapper"
        isLoading={loading}
        onScroll={(e) => {
          const target = e.target as Element;
          const bottom =
            target.scrollHeight - target.scrollTop === target.clientHeight;
          bottom && setPage(page + 1);
        }}
      >
        {images.map((image) => (
          <Image key={image.id} {...image} />
        ))}
      </ImagesWrapper>
    </Container>
  );
};
