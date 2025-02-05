import { useCallback, useEffect, useState } from 'react';

const useImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  const onError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    isError,
    onLoad,
    onError,
  };
};

export function Image({
  fallback,
  setIsLoading,
  src,
  ...props
}: {
  className?: string;
  fallback: string;
  setIsLoading: SetState<boolean>;
  src: string;
}) {
  const image = useImage();
  const fallbackImage = useImage();
  const imageIsLoaded = !image.isLoading && !image.isError;
  const fallbackIsLoaded = !fallbackImage.isLoading && !fallbackImage.isError;

  useEffect(() => {
    if (imageIsLoaded || fallbackIsLoaded) {
      setIsLoading(false);
    }
  }, [imageIsLoaded, fallbackIsLoaded]);

  return (
    <>
      {image.isLoading || fallbackImage.isError || imageIsLoaded ? null : (
        <img
          src={fallback}
          {...props}
          onError={fallbackImage.onError}
          onLoad={fallbackImage.onLoad}
        ></img>
      )}
      {image.isError ? null : (
        <img
          src={src}
          {...props}
          onError={image.onError}
          onLoad={image.onLoad}
        ></img>
      )}
    </>
  );
}
