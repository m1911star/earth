import clsx from 'clsx';
import Image from 'next/image';
import { memo, useState } from 'react';
import styles from './styles.module.css';

export type ImageProps = {
  /** aspect ratio of the image: width / height */
  aspectRatio?: number;
  /** color of the placeholder */
  color?: string;
  /** fit mode of the image, same as object-fit */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  /** animation type while loading. This option should be used in conjunction with "color" props.  */
  skeletonType?: 'solid' | 'shimmer' | 'pulse';
  /** toggle the transition between the image and skeleton */
  transition?: boolean;
  /** border radius of the image */
  borderRadius?: string;
  imageClassName?: string;
} & React.ComponentProps<typeof Image>;

/** a wrapper around next/image that adds a placeholder */
const ImageWithPlaceholder = memo(function ImageWithPlaceholderImpl({
  aspectRatio = 1,
  src,
  alt,
  className,
  priority,
  fill,
  color,
  fit = 'fill',
  skeletonType = 'solid',
  transition = true,
  borderRadius = '0px',
  imageClassName,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  let containerStyle = {};
  containerStyle = {
    paddingTop: `${(1 / aspectRatio) * 100}%`,
  };

  const handleLoadingComplete = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  let backgroundColor = '';
  let backgroundImage = '';
  switch (skeletonType) {
    case 'solid':
      backgroundColor = color || 'transparent';
      break;
    case 'shimmer':
      backgroundImage = `linear-gradient(95deg, transparent 20%, ${color} 50%, transparent 70%`;
      break;
    case 'pulse':
      backgroundColor = color || '#fff';
      break;
  }

  return (
    <div className={clsx('w-full', className)}>
      <div className="overflow-hidden relative h-0" style={containerStyle}>
        {/* placeholder */}
        {color && (
          <div
            className={clsx(
              'inset-0 absolute w-full h-full transition-opacity duration-500 ease-in-out',
              {
                [styles.AnimateShimmer]: skeletonType === 'shimmer',
                'animate-pulse': skeletonType === 'pulse',
                'opacity-0': loaded,
                'opacity-100': !loaded,
              }
            )}
            style={{ backgroundColor, backgroundImage }}
          ></div>
        )}
        {src && (
          <Image
            src={src}
            priority={priority}
            alt={alt}
            width={100 * aspectRatio}
            height={100}
            fill={fill}
            style={{
              objectFit: fit,
              borderRadius,
            }}
            className={clsx('absolute inset-0 w-full h-full', imageClassName, {
              'opacity-0': !loaded,
              'opacity-100': loaded,
              'transition-opacity duration-500 ease-in-out': transition,
            })}
            onLoad={handleLoadingComplete}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
});

// ref: https://github.com/storybookjs/storybook/issues/15401
// add this to make storybook happy
ImageWithPlaceholder.displayName = 'ImageWithPlaceholder';

export default ImageWithPlaceholder;
