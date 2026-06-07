import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace this with your actual user database/authentication logic
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // In a real application, you would:
    // 1. Validate the input
    // 2. Check the credentials against a database
    // 3. Hash the password before comparing
    // 4. Use a proper JWT library to generate tokens
    
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a simple JWT token (in a real app, use a proper JWT library)
    const token = generateMockToken(user);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateMockToken(user: typeof MOCK_USERS[0]) {
  // This is a simplified mock token generation
  // In a real app, use a proper JWT library with proper signing
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  return `mock.${base64Payload}.token`;
}