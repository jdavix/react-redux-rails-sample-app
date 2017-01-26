FactoryGirl.define do
  factory :support_admin do
    sequence(:email){|n| "user#{n}@factory.com" }
    role "admin"
    password "testpass"
    password_confirmation "testpass"
  end
end