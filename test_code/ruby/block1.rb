numbers = ["one","two","three"]
numbers.each {|number| print number}

puts

person = {:first_name => "James", :middle_name => "Robert", :last_name => "Bond"}
person.each { |key| puts key }
