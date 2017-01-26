class AddStatusDateFieldsToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :resolved_at, :datetime
    add_column :tickets, :started_at, :datetime
  end
end
