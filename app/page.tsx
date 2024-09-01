'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import ImageWithPlaceholder from '@/components/image/index';
import { useDocumentTitle } from '@mantine/hooks';

export default function Home() {
  useDocumentTitle('Home');
  // add page title to the page
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen entry">
      <div className="text-white text-4xl font-bold pt-20 pb-4">
        Welcome to the Gallery
      </div>
      <div className="flex flex-row items-center justify-center flex-1 w-screen gap-4 py-0">
        <Link href="/rocket">
          <Card className="w-96 h-80 flex flex-col hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-md text-white">
            <CardContent className="flex flex-col items-start gap-2 flex-1 p-0">
              <div className="w-full h-full">
                <ImageWithPlaceholder
                  src="/cz.jpg"
                  alt="gallery"
                  skeletonType="shimmer"
                  objectFit="contain"
                  width={100}
                  height={100}
                  aspectRatio={382 / 255}
                  imageClassName="!rounded-b-none !rounded-xl object-contain"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 py-3">
              <CardTitle>Rocket</CardTitle>
              <CardDescription className="text-white">
                View the rocket
              </CardDescription>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/earth">
          <Card className="w-96 h-80 flex flex-col hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-md text-white">
            <CardContent className="flex flex-col items-start gap-2 flex-1 p-0">
              <div className="w-full h-full">
                <ImageWithPlaceholder
                  src="/earth.jpg"
                  alt="gallery"
                  skeletonType="shimmer"
                  objectFit="contain"
                  width={100}
                  height={100}
                  aspectRatio={382 / 255}
                  imageClassName="!rounded-b-none !rounded-xl object-contain"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 py-3">
              <CardTitle>Earth</CardTitle>
              <CardDescription className="text-white">
                View the earth
              </CardDescription>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/gallery">
          <Card className="w-96 h-80 flex flex-col hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-md text-white">
            <CardContent className="flex flex-col items-start gap-2 flex-1 p-0">
              <div className="w-full h-full">
                <ImageWithPlaceholder
                  src="/all.png"
                  alt="gallery"
                  skeletonType="shimmer"
                  objectFit="fill"
                  width={100}
                  // height={100}
                  aspectRatio={382 / 255}
                  imageClassName="!rounded-b-none !rounded-xl object-fill"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 py-3">
              <CardTitle>Rockets Gallery</CardTitle>
              <CardDescription className="text-white">
                View the rockets gallery
              </CardDescription>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
