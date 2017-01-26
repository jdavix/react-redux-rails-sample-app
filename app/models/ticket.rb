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
  belongs_to :support_admin, optional: true


  #Validations:
  validates :subject, presence:true
  validates :description, presence:true

  #Scopes:
  scope :order_by_action_time, ->(status){
    order(action_time(status) => :desc)
  }


  aasm column: :status do
    state :sent, :initial => true
    state :inprogress, :resolved

    event :start, before: :assign_started_at do
      transitions :from => [:sent], :to => :inprogress
    end

    event :resolve, before: :assign_resolved_at do
      transitions :from => [:inprogress], :to => :resolved
    end

  end

  def self.scopes
    SCOPES + [:all]
  end

  def self.action_time(scope)
    time_field = if scope == "inprogress"
      "started_at"
    elsif "resolved"
      "resolved_at"
    else
      "created_at"
    end
  end

  def status_label
    @status_label ||= STATUSES.invert[self.status.to_sym]
  end

  private
    def assign_started_at
      self.started_at = Time.zone.now
    end

    def assign_resolved_at
      self.resolved_at = Time.zone.now
    end

end
