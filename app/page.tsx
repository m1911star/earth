'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
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
                <Image
                  className="object-contain rounded-b-none rounded-xl w-full h-full"
                  src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={100}
                  height={100}
                  alt="rocket"
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
                <Image
                  className="rounded-b-none rounded-xl w-full h-full"
                  src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={100}
                  height={100}
                  alt="earth"
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
                <Image
                  className="object-contain rounded-b-none rounded-xl w-full h-full"
                  src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={100}
                  height={100}
                  alt="gallery"
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
