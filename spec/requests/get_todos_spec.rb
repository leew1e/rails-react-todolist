require "rails_helper"

RSpec.describe "Todos", type: :request do
  describe "GET /show" do
    let!(:user) { User.create(username: "test1", password: "password") }

    before do
      first_todo = Todo.create(title: "first", done: false, user_id: user.id)
      second_todo = Todo.create(title: "second", done: false, user_id: user.id)

      get "/api/v1/todos/#{user.id}"
    end

    it "returns all todos for person" do
      expect(json.size).to eq(2)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(:success)
    end
  end
end
