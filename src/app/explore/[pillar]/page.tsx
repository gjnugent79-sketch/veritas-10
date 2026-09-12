import { PILLARS } from '@/lib/catalogue';
import PillarClient from './PillarClient';

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.id }));
}

export default function PillarPage() {
  return <PillarClient />;
}
