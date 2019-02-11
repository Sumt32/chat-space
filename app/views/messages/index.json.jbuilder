json.array! @new_messages.each do |message|
  json.id message.id
  json.body message.body
  json.name message.user.name
  json.time message.created_at.in_time_zone('Tokyo').strftime("%Y-%m-%d %H:%M")
  json.image message.image
end
