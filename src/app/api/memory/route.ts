import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');
const JOURNAL_FILE = path.join(DATA_DIR, 'journal.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
[MEMORIES_FILE, JOURNAL_FILE].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]', 'utf-8');
  }
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  try {
    let data = {};
    if (type === 'all' || type === 'chat') {
      const memories = fs.readFileSync(MEMORIES_FILE, 'utf-8');
      data = { ...data, memories: JSON.parse(memories) };
    }
    if (type === 'all' || type === 'journal') {
      const journal = fs.readFileSync(JOURNAL_FILE, 'utf-8');
      data = { ...data, journal: JSON.parse(journal) };
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read memory data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    const file = type === 'chat' ? MEMORIES_FILE : JOURNAL_FILE;
    
    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(file, 'utf-8'));
    
    // Add new data
    existingData.push(data);
    
    // Write back to file
    fs.writeFileSync(file, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save memory data' }, { status: 500 });
  }
} 