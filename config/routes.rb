Rails.application.routes.draw do
  devise_for :support_admins
  devise_for :customers

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :tickets, only:[:create, :index, :update, :show] do
      end
      resources :customers do
        post 'update_profile', to: 'customers#update_profile', on: :collection
      end
    end
  end

  get '*path', to: 'customer_portal/base#index'

  root to: 'customer_portal/base#index'
end
