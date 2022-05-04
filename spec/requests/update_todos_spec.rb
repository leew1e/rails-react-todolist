require "rails_helper"

RSpec.describe "Todos", type: :request do
  describe "PUT /update" do
    let!(:user) { User.create(username: "test1", password: "password") }
    let!(:task) { Todo.create(title: "first", done: false, user_id: user.id) }

    context "with valid parameters" do
      before do
        put "/api/v1/todos/#{task.id}",
            params: {
              todo: { title: "new_title" },
            }
      end

      it "returns an ok status" do
        expect(response).to have_http_status(:ok)
      end

      it "returns the title" do
        expect(json["title"]).to eq("new_title")
      end
    end

    context "with invalid parameters" do
      before do
        put "/api/v1/todos/#{task.id}",
            params: {
              todo: { title: nil },
            }
      end

      it "returns a unprocessable entity status" do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
