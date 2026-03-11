import { NextResponse } from 'next/server';
import { seedDatabase } from '../../../lib/seed';

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    await seedDatabase();
    
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
