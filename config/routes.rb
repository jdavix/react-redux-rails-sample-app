Rails.application.routes.draw do
  devise_for :support_admins
  devise_for :customers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :customer_portal do
    
  end

  namespace :support_admin do
    
  end

  root 'customer_portal/base#index'

end
