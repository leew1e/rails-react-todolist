Rails.application.routes.draw do
  scope "/api/v1" do
    resources :todos
  end

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/logged_in", to: "sessions#is_logged_in?"

  resources :users, only: [:create, :show, :index]
end
