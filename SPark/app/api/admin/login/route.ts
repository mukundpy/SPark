import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In production, fetch admin from database
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@spark.college.edu';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check credentials
    if (email !== adminEmail) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In production, use bcrypt.compare with hashed password from database
    const isValidPassword = password === adminPassword;
    // const isValidPassword = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with token in cookie
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Login successful',
        user: { email, role: 'admin' }
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
