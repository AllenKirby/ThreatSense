
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://zxwejdicrhqqimyavejk.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4d2VqZGljcmhxcWlteWF2ZWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMTI1ODEsImV4cCI6MjAyOTg4ODU4MX0.giLCjEdsIs4TEl9Qvt6sirWHCRMlaJqfxqw-Sa5OA6k'
)

export default supabase