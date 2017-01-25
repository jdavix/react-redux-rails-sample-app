class AddSupportAdminIdToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :support_admin_id, :integer
    add_index :tickets, :support_admin_id
  end
end
