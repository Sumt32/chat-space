json.name @message.user.name
json.body @message.body
json.image @message.image
json.time @message.created_at.in_time_zone('Tokyo').strftime("%Y-%m-%d%H:%M")
