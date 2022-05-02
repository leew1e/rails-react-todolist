FactoryBot.define do
  factory :todo do
    title { "Watch movies" }
    done { false }
    user factory: [:user]

    trait :invalid do
      title { "Pepega is great! I wanna be pepega." }
      done { false }
      user { nil }
    end
  end

  factory :user do
    username { "Macdonald" }
    password { "password" }
  end
end
