import { NextResponse } from 'next/server';
import { fetchProfiles } from '@/utils/fetcher';

export async function GET() {
  try {
    const profiles = await fetchProfiles();
    return NextResponse.json({ 
      success: true, 
      profiles,
      count: profiles.length 
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch profiles' 
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const profiles = await fetchProfiles();
    return NextResponse.json({ 
      success: true, 
      message: 'Profiles seeded successfully',
      profiles,
      count: profiles.length 
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed profiles' 
      },
      { status: 500 }
    );
  }
}
