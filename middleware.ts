import { NextResponse } from 'next/server';

export function middleware(req) {
  if (process.env.DEVELOPMENT !== 'true') {
    return NextResponse.next();
  }

  const url = req.nextUrl;

  // Check if the request is for an image in the content/rules folder
  if (url.pathname.startsWith('/rules/') && url.pathname.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
    const escapedUrl = encodeURIComponent(url.pathname);
    const apiUrl = `http://localhost:3000/api/serve-image?filepath=${escapedUrl}`;
    console.log('Redirecting to API for image:', apiUrl);
    return NextResponse.redirect(apiUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rules/:path*'],
};
