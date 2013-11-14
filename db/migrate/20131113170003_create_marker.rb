class CreateMarker < ActiveRecord::Migration
  def change
    create_table :markers do |g|
      g.belongs_to :tripmap
      g.string :name
      g.integer :lat
      g.integer :long
      g.string :icon
      g.string :description
      g.timestamps
    end

  end
end
