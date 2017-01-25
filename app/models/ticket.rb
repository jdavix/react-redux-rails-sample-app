class Ticket < ApplicationRecord
  include AASM
  #Constants:
  STATUSES = {
             "Open" => :sent,
             "In Progress" => :inprogress,
             "Resolved" => :resolved 
           }

  STATUS_ACTIONS = ["start", "resolve"]

  SCOPES=STATUSES.values

  #Relations:
  belongs_to :customer
  belongs_to :admin_user, optional: true


  #Validations:
  validates :subject, presence:true
  validates :description, presence:true


  aasm column: :status do
    state :sent, :initial => true
    state :inprogress, :resolved

    event :start do
      transitions :from => [:sent], :to => :inprogress
    end

    event :resolve do
      transitions :from => [:inprogress], :to => :resolved
    end

  end

  def self.scopes
    SCOPES + [:all]
  end

  def status_label
    @status_label ||= STATUSES.invert[self.status.to_sym]
  end

end
