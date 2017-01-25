class SupportAdminSerializer < ActiveModel::Serializer

  attributes :id, :created_at, :email, :last_sign_in_at

  def created_at
    object.created_at.strftime("%a, %B %d %H:%M - %Y ")
  end
end