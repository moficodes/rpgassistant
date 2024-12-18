'use client';

import { Button } from '@/components/ui/button';
import { menuSuggestionFlow } from './lib/genkit/genkit';
import { useState } from 'react';

export default function Home() {
  const [menuItem, setMenuItem] = useState<string>('');

  async function getMenuItem(formData: FormData) {
    const theme = formData.get('theme')?.toString() ?? '';
    const suggestion = await menuSuggestionFlow(theme);
    setMenuItem(suggestion);
  }

  return (
    <main>
      <form action={getMenuItem}>
        <label htmlFor="theme">
          Suggest a menu item for a restaurant with this theme:{' '}
        </label>
        <input type="text" name="theme" id="theme" />
        <br />
        <br />
        <Button type="submit">Generate</Button>
      </form>
      <br />
      <pre>{menuItem}</pre>
    </main>
  );
}