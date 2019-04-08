class Event < ApplicationRecord
  has_many :chatrooms, dependent: :destroy
end
