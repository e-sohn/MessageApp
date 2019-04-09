class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :chatrooms
  has_many :posts, dependent: :destroy
  validates_uniqueness_of :email
  validates :username, :password, :email, presence: true

  def self.find_from_credentials(email, password)
    user = self.find_by(email: email)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
end
