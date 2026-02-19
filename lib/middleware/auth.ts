import { NextRequest, NextResponse } from 'next/server';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    email: string;
    role: string;
  };
}

export async function verifyAuth(request: NextRequest): Promise<{
  authenticated: boolean;
  user?: { email: string; role: string };
  error?: string;
}> {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token || token !== 'admin-session') {
      return { authenticated: false, error: 'No valid session' };
    }

    return { authenticated: true, user: { email: 'admin', role: 'admin' } };
  } catch {
    return { authenticated: false, error: 'Invalid session' };
  }
}
