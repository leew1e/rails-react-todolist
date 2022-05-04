require "rails_helper"

RSpec.describe "Todos", type: :request do
  describe "DELETE /destroy" do
    let!(:user) { User.create(username: "test1", password: "password") }
    let!(:task) { Todo.create(title: "first", done: false, user_id: user.id) }

    before do
      delete "/api/v1/todos/#{task.id}"
    end

    it "returns status code 204" do
      expect(response).to have_http_status(204)
    end
  end
end
