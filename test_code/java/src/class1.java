package project1;

public class class1 {
	public static void main (String[] args){
		System.out.println("Hello Eclipse!!!");
		System.out.println("Summa n, two variants...");
		
		int max = 10;
		int Summa = 0;
		int Summa2 = 0;
		
		for(int n= 1; n < max; n++){
			Summa += n;
		}//next
		System.out.println("Summa n:" + Summa);
		
		//1, 2, 3, 4, 5, 6, 7, 8, 9, 10
		int num = max / 2;
		
		//odd or even number? 
		if( (max % 2) == 1){
			Summa2 = num * max;
		} else {
			Summa2 = num * (max-1);
		}
		
		System.out.println("Summa2:" + Summa2);
		
	}
}
