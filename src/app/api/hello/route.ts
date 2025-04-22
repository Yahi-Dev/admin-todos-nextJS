import { NextResponse } from 'next/server'

export async function GET() { 

  return NextResponse.json({
    method: 'POST',
    message: 'Hello World',
  })
}


export async function POST() { 

    return NextResponse.json({
      method: 'POST',
      message: 'Hello World',
    })
  }