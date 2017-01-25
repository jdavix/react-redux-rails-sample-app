class AddRoleToSupportAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :support_admins, :role, :string
    add_index :support_admins, :role
  end
end
