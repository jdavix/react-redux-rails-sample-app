FactoryGirl.define do
  factory :customer do
    sequence(:email){|n| "user#{n}@factory.com" }
    password "testpass"
    password_confirmation "testpass"
  end
end