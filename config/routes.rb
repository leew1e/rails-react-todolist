Rails.application.routes.draw do
  scope '/api/v1' do
    resources :todos
  end
  
  # Defines the root path route ("/")
  # root "articles#index"
end
