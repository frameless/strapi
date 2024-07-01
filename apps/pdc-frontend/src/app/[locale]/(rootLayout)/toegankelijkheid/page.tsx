import { Metadata } from 'next';
import { AuditRapport } from '@/components/AuditRapport';
import wcagEmJSON from '../../../../../wcag-evaluation.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Toegankelijkheid',
  };
}

const Toegankelijkheid = async () => {
  return <AuditRapport evaluation={wcagEmJSON} />;
};

export default Toegankelijkheid;
