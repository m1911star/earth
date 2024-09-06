'use client';
import { SolarStage } from '@/components/stage';
import { useDocumentTitle } from '@mantine/hooks';

export default function Solar() {
  useDocumentTitle('Solar System');
  return <SolarStage />;
}
