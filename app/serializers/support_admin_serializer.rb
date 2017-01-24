class SupportAdminSerializer < ActiveModel::Serializer

  attributes :id, :created_at, :email, :last_sign_in_at

end