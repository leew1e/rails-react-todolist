Rails.application.routes.draw do
  scope "/api/v1" do
    resources :todos
  end

  resources :users, only: [:create, :show, :index]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/logged_in", to: "sessions#is_logged_in?"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
