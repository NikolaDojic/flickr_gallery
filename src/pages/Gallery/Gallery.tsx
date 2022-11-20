import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../components";
import { useGetImages } from "../../hooks/useGetImages";
import { TPhoto } from "../../types";
import { Image } from "./Image";

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<TPhoto[]>([]);
  const { loading, error, data } = useGetImages({ page });
  useEffect(() => {
    if (data) {
      const { photo, page, perpage } = data.photos;
      const currentImg = images.slice(0, (page - 1) * perpage);
      setImages([...currentImg, ...photo]);
      console.log(page, perpage, images);
    }
  }, [data]);
  return (
    <Container>
      <ImagesWrapper
        onScroll={(e) => {
          const { target } = e;
          const { scrollTop, scrollHeight, clientHeight } = target;
          console.log(scrollTop, scrollHeight, clientHeight);
          const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
          console.log(bottom);
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

export default Gallery;
