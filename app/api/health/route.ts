import { NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase";
export async function GET(){return NextResponse.json({status:"ok",service:"ai-tools-hub",supabaseConfigured:hasSupabase});}
