Rails.application.routes.draw do
  devise_for :users
  resources :courses do
    member do
      get 'join'
    end
  end
  get 'welcome/index'

  get 'welcome/profile'

  get 'welcome/help'

  get 'welcome/classroom'

  root 'welcome#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
