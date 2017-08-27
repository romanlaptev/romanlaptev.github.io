if ARGV[0]
  num = ARGV[0].to_i
else
  num = 1
end

while num<10
  puts "num = " + num.to_s
  num +=1
end
 