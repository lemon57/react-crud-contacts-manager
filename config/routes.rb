
Rails.application.routes.draw do
  root to: redirect('/contacts')

# inform Rails about the routes which will be using in the app
  get 'contacts', to: 'site#index'
  get 'contacts/new', to: 'site#index'
  get 'contacts/:id', to: 'site#index'
  get 'contacts/:id/edit', to: 'site#index'

  namespace :api do
    resources :contacts, only: %i[index show create destroy update]
  end
end
