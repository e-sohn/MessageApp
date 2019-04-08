class Chatroom < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :event
  has_many :posts, dependent: :destroy
end
