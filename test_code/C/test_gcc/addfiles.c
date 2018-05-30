/* Добавить файл1 к файлу2 */
/* Аргументами командной строки являются имя программы, */
/* имя файла-источника, имя файла-приемника */

#include <stdio.h>
#include <stdlib.h>

int main(argc,argv)

int argc; /* Число аргументов в командной строке */
char *argv []; /* Вектор указателей на аргументы */

{
 FILE *f1,*f2; /* Указатели на файл-источник и файл-приемник */
 char ch;      /* Переписываемый символ */

 if (argc !=3)
   {
      printf("Неверное количество аргументов\n");
      printf(">программа файл-источник файл-приемник\n");
      exit (1); // Возвращает в ERROLEVEL 1, т.к. ошибка
   }

 if ((f1=fopen(argv[1],"r"))==NULL)
   {
      printf("Ошибка открытия %s\n",argv[1]);
      exit (1); // Возвращает в ERROLEVEL 1, т.к. ошибка
   }

 if ((f2=fopen(argv[2],"a"))==NULL)
   {
      printf("Ошибка открытия %s\n",argv[2]);
      exit (1); // Возвращает в ERROLEVEL 1, т.к. ошибка
   }

/* Добавление из f1 в f2 */
  while ((ch=fgetc(f1)) !=EOF)
   {
    fputc(ch,f2);    
    ch=32;
    fputc(ch,f2);    
   }

/* Закрытие файла*/
  fclose (f1);
  fclose (f2);
  return 0;  
}

