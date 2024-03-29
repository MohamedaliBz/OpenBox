
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vvaoyenmsgkzazmnkwqv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YW95ZW5tc2dremF6bW5rd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NTYzMjIsImV4cCI6MjAyNzEzMjMyMn0.I_DY_9UhycsQzz2N2zStmunwZ2SBuAOHDh95xBaOAg4"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase