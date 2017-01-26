require 'spec_helper'

describe Customer do
  it "validates presence of email on creation" do
    expect(FactoryGirl.build(:customer, email:nil)).to_not be_valid
  end
  it "validates presence match of password and password_confirmation" do
    expect(FactoryGirl.build(:customer, password:"adfdf", password_confirmation:"123")).to_not be_valid
  end
  it "has many tickets" do
    customer = FactoryGirl.create(:customer)
    expect(customer.tickets.new).to be_a_new Ticket
  end
end