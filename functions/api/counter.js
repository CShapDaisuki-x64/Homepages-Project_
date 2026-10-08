export async function onRequestGet(context) {
    const result = await context.env.DB
        .prepare(`
            UPDATE counter
            SET count = count + 1
            WHERE id = 1
            RETURNING count
        `)
        .first();

    return Response.json({
        count: result.count
    });
}