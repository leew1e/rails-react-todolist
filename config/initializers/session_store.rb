if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_todo-app', domain: 'todo-api'
else
    Rails.application.config.session_store :cookie_store, key: '_todo-app'
end