require 'spec_helper'

describe Ticket do
  describe "::scopes" do
    it{  expect(Ticket.scopes).to eq(Ticket::SCOPES + [:all]) }
  end
  describe "::action_time" do
    context "returns which field to sort the tickets depending on the status scope" do
      it{  expect(Ticket.action_time("resolved")).to eq "resolved_at"  }
      it{  expect(Ticket.action_time("inprogress")).to eq "started_at"  }
      it{  expect(Ticket.action_time("all")).to eq "created_at"  }
      it{  expect(Ticket.action_time("sent")).to eq "created_at"  }
    end
  end
  describe ".status_label" do
    let(:ticket) {
      Ticket.new
    }
    it "returns the corresponding ticket status label" do
      ticket = Ticket.new
      expect(ticket.status_label).to eq "Open"
    end
  end

  describe "::order_by_action_time scope" do
    it{  expect(Ticket.order_by_action_time("resolved").to_sql).to eq "SELECT `tickets`.* FROM `tickets` ORDER BY `tickets`.`resolved_at` DESC"  }
    it{  expect(Ticket.order_by_action_time("inprogress").to_sql).to eq "SELECT `tickets`.* FROM `tickets` ORDER BY `tickets`.`started_at` DESC"  }
    it{  expect(Ticket.order_by_action_time("all").to_sql).to eq "SELECT `tickets`.* FROM `tickets` ORDER BY `tickets`.`created_at` DESC"  }
  end
end