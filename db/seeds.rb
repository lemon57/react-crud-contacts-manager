# frozen_string_literal: true

json = ActiveSupport::JSON.decode(File.read('db/seeds/contacts.json'))
json.each do |record|
  Contact.create!(record)
end
