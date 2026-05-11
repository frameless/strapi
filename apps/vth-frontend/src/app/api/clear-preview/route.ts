import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(_request: Request) {
  (await draftMode()).disable();
  redirect('/');
}
