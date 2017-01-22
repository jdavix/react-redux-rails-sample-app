Rails.application.routes.draw do
  devise_for :support_admins
  devise_for :customers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :customer_portal do
      #Note: Since customer portal is a SPA web app, all get requests are handled by react router.
      # the following routing redirects get requests to our sigle action. 
  end

  namespace :support_admin do
    
  end

  get '*path', to: 'customer_portal/base#index'
  root to: 'customer_portal/base#index'
end
