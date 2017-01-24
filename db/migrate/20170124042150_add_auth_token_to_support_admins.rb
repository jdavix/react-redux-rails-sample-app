class AddAuthTokenToSupportAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :support_admins, :auth_token, :string
    add_index :support_admins, :auth_token
  end
end
