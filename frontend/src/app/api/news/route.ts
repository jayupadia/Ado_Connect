import { NextResponse } from 'next/server'

const API_KEY = '19a1d9a79c5f45efa8ae8bfedde18855'
const API_URL = 'https://newsapi.org/v2/top-headlines'
const ARTICLES_PER_PAGE = 12

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    
    const res = await fetch(`${API_URL}?country=us&pageSize=${ARTICLES_PER_PAGE}&page=${page}&apiKey=${API_KEY}`)
    
    if (!res.ok) {
      if (res.status === 426) {
        return NextResponse.json({ error: 'Upgrade Required: Please update your client to the latest version. This error indicates that the client is using an outdated version of the API and needs to be updated to continue.' }, { status: 426 })
      }
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: res.status })
    }

    const data = await res.json()

    if (data.status !== 'ok') {
      
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch  {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

