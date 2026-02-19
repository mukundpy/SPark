import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

    if (!token) {
      return { authenticated: false, error: 'No token provided' };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { email: string; role: string };

    return { authenticated: true, user: decoded };
  } catch (error) {
    return { authenticated: false, error: 'Invalid token' };
  }
}

export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authResult = await verifyAuth(request);

    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    // Attach user to request
    (request as AuthenticatedRequest).user = authResult.user;

    return handler(request as AuthenticatedRequest);
  };
}
