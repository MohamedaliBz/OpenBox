// importing the createClient function from @supabase/supabase-js, then initializing a Supabase client with the Supabase URL and API key, and exports it.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vvaoyenmsgkzazmnkwqv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YW95ZW5tc2dremF6bW5rd3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NTYzMjIsImV4cCI6MjAyNzEzMjMyMn0.I_DY_9UhycsQzz2N2zStmunwZ2SBuAOHDh95xBaOAg4"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// This code is used to interact with a Supabase project from a JavaScript environment, 
// such as a web browser or a Node.js application.
// You can then use the exported supabase object to perform various operations like querying the database, managing authentication, etc.