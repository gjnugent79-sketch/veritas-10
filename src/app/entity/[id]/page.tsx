import { CATALOGUE } from '@/lib/catalogue';
import EntityClient from './EntityClient';

export function generateStaticParams() {
  return CATALOGUE.map((e) => ({ id: e.id }));
}

export default function EntityPage() {
  return <EntityClient />;
}
