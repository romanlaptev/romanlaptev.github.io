class Cart

	attr_reader :items

	include ItemContainer

	def initialize(owner)
	    @items=[]
		@owner = owner
	end

	def save_to_file
		File.open("#{@owner}_cart.txt","w") do |f|
			@items.each { |i| f.puts i } # car:100:50
			#@items.each do |i| 
				#raise "Cart currently doesn't support saving Virtual Items to file" if i.class == VirtualItem
				#f.puts i
			#end
		end
	end

	def read_from_file
		#return unless File.exists?("#{@owner}_cart.txt")

		#item_fields = File.readlines("#{@owner}_cart.txt") # "car:100:50\n"
		#item_fields.map! { |i| i.chomp }# удалить перевод строки
		#item_fields.map! { |i| i.split(":") }# разбить строку на элементы ["car","100","50"]
		#создать объекты
		#item_fields.each { |i| @items << RealItem.new({name: i[0], price: i[1].to_i, weight: i[2].to_i}) }
		#@items.uniq! #удалить повторяющиеся элементы

		begin
			File.readlines("#{@owner}_cart.txt").each { |i| @items << i.to_real_item }
			@items.uniq! #удалить повторяющиеся элементы
		rescue Errno::ENOENT
			File.open("#{@owner}_cart.txt","w") {}
			puts "file created!!!!!"
		end
	end

end
