import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: 'Singing Bowls', slug: 'singing-bowls', description: 'Hand-hammered singing bowls from Nepal.', is_active: true, sort_order: 1 },
  { name: 'Statues', slug: 'statues', description: 'Intricately crafted statues and idols.', is_active: true, sort_order: 2 },
  { name: 'Thangkas', slug: 'thangkas', description: 'Traditional Tibetan Buddhist paintings.', is_active: true, sort_order: 3 },
];

async function seed() {
  for (const cat of categories) {
    const { error } = await supabase.from('categories').insert(cat);
    if (error) {
      console.error(`Failed to insert ${cat.name}:`, error.message);
    } else {
      console.log(`Inserted category: ${cat.name}`);
    }
  }
}

seed();
