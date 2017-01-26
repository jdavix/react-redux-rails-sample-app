class SupportAdmin < ApplicationRecord
  include TokenAuthenticable
  include ErrorHash

  ROLES=["admin", "staff"]

  has_many :tickets

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :role, inclusion: {in: ROLES}

end
