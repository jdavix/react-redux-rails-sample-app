require 'spec_helper'

describe SupportAdmin do
  it "validates presence of email on creation" do
    expect(FactoryGirl.build(:support_admin, email:nil)).to_not be_valid
  end
  it "validates presence match of password and password_confirmation" do
    expect(FactoryGirl.build(:support_admin, password:"adfdf", password_confirmation:"123")).to_not be_valid
  end
  it "has many tickets" do
    support_admin = FactoryGirl.create(:support_admin)
    expect(support_admin.tickets.new).to be_a_new Ticket
  end
  it "validates role field" do
    SupportAdmin::ROLES.each { |role|
      expect(FactoryGirl.build(:support_admin, role: role)).to be_valid
    }
    expect(FactoryGirl.build(:support_admin, role: "random_one")).to_not be_valid
  end
end