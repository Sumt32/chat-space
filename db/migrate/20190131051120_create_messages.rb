class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.string :image
      t.references :group, foreing_key: true
      t.timestamps :user, foreing_key: true
    end
  end
end
