require "rails_helper"

RSpec.describe "Todos", type: :request do
  describe "POST /create" do
    context "with valid parameters" do
      let!(:user) { User.create(username: "test1", password: "password") }
      let!(:task) { Todo.new(title: "first", done: false, user_id: user.id) }

      before do
        post "/api/v1/todos",
             params: {
               todo: {
                 title: task.title,
                 done: task.done,
                 user_id: task.user_id,
               },
             }
      end

      it "returns the title" do
        expect(json["title"]).to eq(task.title)
      end

      it "returns an ok status" do
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      before do
        post "/api/v1/todos",
             params: {
               todo: {
                 title: "",
                 done: "",
                 user_id: 0,
               },
             }
      end

      it "returns a unprocessable entity status" do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
