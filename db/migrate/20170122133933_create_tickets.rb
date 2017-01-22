class CreateTickets < ActiveRecord::Migration[5.0]
  def change
    create_table :tickets do |t|
      t.string :subject
      t.text :description
      t.string :status

      t.timestamps
    end
    add_index :tickets, :status
  end
end
