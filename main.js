// Initialize Supabase
const supabase = supabase.createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

async function saveToSupabase(payload, bookId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (bookId) {
        await supabase.from('books').update(payload).eq('id', bookId).eq('user_id', user.id);
    } else {
        await supabase.from('books').insert({ ...payload, user_id: user.id });
    }
}

async function loadFromSupabase(bookId) {
    const { data } = await supabase.from('books').select('*').eq('id', bookId).single();
    return data;
}
