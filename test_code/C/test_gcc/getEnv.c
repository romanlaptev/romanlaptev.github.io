#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void)
{
   char *path;

    path = getenv("PATH");
    printf("System variable PATH:");
    printf( path, "%s" );
    printf( "\n" );
    return 0;
}