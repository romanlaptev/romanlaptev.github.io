require_relative "item_container"
require_relative "cart"
require_relative "item"
require_relative "real_item"
require_relative "virtual_item"
require_relative "order"
require_relative "string"

#cart = Cart.new
#cart.add_item(Item.new)
#cart.add_item(Item.new)
#cart.validate

#p cart.items
#cart.remove_item
#p cart.items

#item = Item.new ({:price => 10, :weight => 100, :name => "Car"})
#item.info { |attr| puts attr}

#item1 = Item.new ({:price => 10, :weight => 100, :name => "Car1"})
#item2 = Item.new ({:weight => 100, :name => "Car2"})

#item1 = VirtualItem.new ({:price => 101, :name => "file1"})
#item2 = RealItem.new ({:price => 99, :weight => 100, :name => "Car2"})
@items = []
@items << VirtualItem.new({:price => 101, :name => "File1"})
@items << RealItem.new({:price => 101, :weight => 100, :name => "Car"})
@items << RealItem.new({:price => 101, :weight => 100, :name => "Dishwasher"})
@items << RealItem.new({:price => 101, :weight => 100, :name => "kettle"})


#cart = Cart.new
#cart.add_item(item1)
#cart.add_item item2

#cart.delete_invalid_items

#p cart.items
#puts "product in cart - " + cart.items.size.to_s

#p item1.respond_to?(:weight)
#p item2.respond_to?(:weight)

#puts "product1, real price - " + item1.real_price.to_s
#puts "Discount - " + Item.discount.to_s
#puts "Tax - " + item1.tax.to_s
#puts "product1, price with discount and tax - " + item1.price.to_s


#order = Order.new
#order.add_item item1
#order.add_item item2

#order.remove_item

#puts "product in order - " + order.items.size.to_s
#puts "product with price in oder - " + order.count_valid_items.to_s

#-------------------------

