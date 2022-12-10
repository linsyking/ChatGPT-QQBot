// Synthesize message

export function group_text(group_id, text_msg) {
    // Synthesize a group msg
    return JSON.stringify({
        "type": "group",
        "target_id": group_id,
        "content": text_msg
    })
}

export function private_text(private_id, text_msg) {
    // Synthesize a group msg
    return JSON.stringify({
        "type": "private",
        "target_id": private_id,
        "content": text_msg
    })
}
