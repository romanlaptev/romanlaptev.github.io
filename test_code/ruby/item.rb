class Item

  def initialize(options={})
    @real_price = options[:price]
    @name = options[:name]
  end

#getter
#  def price
#    @price
#  end
  attr_reader :real_price, :name

#setter
#  def price=(price_value)
#    @price = price_value
#  end
  attr_writer :real_price

  #attr_accessor :price, :weight

  def info
    yield (name)
    yield (price)
  end


##################################
  @@discount = 0.05 # переменная класса (скидка 5% от цены товара)
  def self.discount

    if Time.now.month == 4 # в апреле скидка 10% от цены товара
      @@discount = 0.1
      return @@discount
    else
      return @@discount
    end

  end

##################################
  def price
   (@real_price - @real_price*self.class.discount) + tax
  end

##################################
  #private
	  def tax
	    type_tax = if self.class == VirtualItem
	      1
	    else
	      2
	    end

	    cost_tax = if @real_price > 5
	      @real_price*0.2
	    else
	      @real_price*0.1
	    end

	    cost_tax + type_tax
	  end #end tax

	def to_s
		"#{self.name}:#{self.price}:#{self.weight}"
	end

end #end class

#Item1 = Item.new({:price=>9,:weight=>30})
#puts "Object id: " + Item1.object_id.to_s

#Item1.price=10
#puts Item1.price

#Item1.weight=100
#puts Item1.weight

#p Item1
