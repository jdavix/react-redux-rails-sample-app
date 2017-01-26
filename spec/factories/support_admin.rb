FactoryGirl.define do
  factory :support_admin do
    sequence(:email){|n| "user#{n}@admin.com" }
    role "admin"
    password "testpass"
    password_confirmation "testpass"
  end
end