class Ticket < ApplicationRecord
  #Constants:
  STATUSES = {
             "Open" => :open, 
             "In Progress" => :inprogress, 
             "Resolved" => :resolved 
           }
  SCOPES=STATUSES.values

  #Relations:
  belongs_to :customer
  belongs_to :admin_user, optional: true


  #Scopes:
  SCOPES.each{ |state| self.scope(state, ->(){  where(status: state.to_s) }) }

  #Validations:
  validates :subject, presence:true
  validates :description, presence:true

  #Callbacks:
  after_initialize :set_default_values



  def self.scopes
    SCOPES + [:all]
  end

  private
    def set_default_values
        self.status = STATUSES["Open"] if !self.status?
    end

end
