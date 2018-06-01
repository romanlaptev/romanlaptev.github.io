#include <stdio.h>
//#include <conio.h>

int main()
{
 int n;

 for (n=0;n<255;n++)
   {
      printf("Symbol %c",n); // Интерпретируется как символ ASCII
      printf("Code %d\n",n); // Интерпретируется как 10-ный код
   }
 //getch();
 return 0;
}


