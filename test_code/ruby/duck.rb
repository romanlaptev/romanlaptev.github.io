class Duck

	@@greeting = "Hello" # переменная класса

	# метод объекта (instance method)
	def quack 
		puts "#{@@greeting} quack quack"
	end

	# метод класса
	def self.quack
		puts "Class quack"
	end

	class << self
		attr_accessor :greeting# instance переменная класса

		def quack2
			puts @greeting
		end
	end

end

duck1 = Duck.new
duck1.quack

Duck.quack

Duck.greeting = "Class quack2"
Duck.quack2
