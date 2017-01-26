Rails.application.routes.draw do
  devise_for :support_admins
  devise_for :customers

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :tickets, only:[:create, :index, :show] do
      end
      resources :customers do
        post 'update_profile', to: 'customers#update_profile', on: :collection
      end
      namespace :admin_users do
        resources :tickets, only:[:create, :index, :update, :show] do
          post :update_status, on: :member
          get :report, on: :collection
        end
        resources :support_admins do
        end
      end
    end
  end
  devise_scope :customer do
    delete 'customer_session/sign_out', to: 'sessions#destroy'
  end

  devise_scope :support_admin do
    delete 'admin_user_session/sign_out', to: 'sessions#destroy'
  end
  get 'customer_portal/*path', to: 'customer_portal/base#index'
  get 'customer_portal/', to: 'customer_portal/base#index'

  root to: redirect("/customer_portal/")

  get '/admin_users/*path', to: 'support_admin/base#index'
  get 'admin_users/', to: 'support_admin/base#index'

end
