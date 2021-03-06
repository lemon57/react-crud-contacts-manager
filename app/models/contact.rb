# frozen_string_literal: true

class Contact < ApplicationRecord
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true , uniqueness: true
    # validates :email, presence: true, uniqueness: { scope: [:first_name, :last_name] }
    validates :phone_number, presence: true
end
