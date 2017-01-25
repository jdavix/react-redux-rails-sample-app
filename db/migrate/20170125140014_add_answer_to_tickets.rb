class AddAnswerToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :answer, :text
  end
end
