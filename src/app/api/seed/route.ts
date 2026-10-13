import { NextResponse } from 'next/server';
import { seedDatabase } from '../../../lib/seed';

export async function GET() {
    try {
        await seedDatabase();
        return NextResponse.json({ message: "Firebase Firestore seeded successfully!" });
    } catch (error: any) {
        console.error("Error during Firestore seed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST() {
    return GET();
}
