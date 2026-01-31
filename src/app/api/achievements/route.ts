import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AchievementModel from '@/models/achievement';

export async function GET() {
  try {
    await connectToDatabase();
    const achievements = await AchievementModel.find().sort({ createdAt: -1 });
    return NextResponse.json(achievements);
  } catch (error: any) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const newAchievement = new AchievementModel({
      title: body.title,
    });
    
    const savedAchievement = await newAchievement.save();
    
    return NextResponse.json(savedAchievement, { status: 201 });
  } catch (error: any) {
    console.error('Error creating achievement:', error);
    
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}