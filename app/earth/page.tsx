'use client';
import { EarthStage } from '@/components/stage';
import { useDocumentTitle } from '@mantine/hooks';

export default function Earth() {
  useDocumentTitle('Earth');
  return <EarthStage />;
}
