Rails.application.routes.draw do
  scope "/api" do
    scope "/v1" do
      resources :todos, only: [:show, :create, :update, :destroy]
      resources :users, only: [:create]

      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/logged_in", to: "sessions#is_logged_in?"

      get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
    end
  end
end
