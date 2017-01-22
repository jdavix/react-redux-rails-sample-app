class AddAuthTokenToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :auth_token, :string
    add_index :customers, :auth_token, unique: true
  end
end
