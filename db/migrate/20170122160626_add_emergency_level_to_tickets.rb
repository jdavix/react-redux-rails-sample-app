class AddEmergencyLevelToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :emergency_level, :string
    add_index :tickets, :emergency_level
  end
end
