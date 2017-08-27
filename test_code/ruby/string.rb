class String
	def to_real_item
		fields = self.chomp# удалить перевод строки
		fields = fields.split(":")# разбить строку на элементы ["car","100","50"]
		RealItem.new({name: fields[0], price: fields[1].to_i, weight: fields[2].to_i})#создать объекты
	end;
end
