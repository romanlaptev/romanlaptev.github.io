#include <stdio.h>
void print_times (char *label, long time);

int main()
{
		FILE *fp;
		double uptime;
		double idle_time;
		
		fp = fopen("/proc/uptime","r");
		fscanf (fp, "%lf %lf\n",&uptime,&idle_time);
		fclose(fp);
		
		print_times("Общее время работы системы: ",(long)uptime);
		print_times("Время простоя системы: ",(long)idle_time);
		
		return 0;
}

void print_times(char *label, long time)
{
	const long minute = 60;
	const long hour = minute * 60;
	const long day = hour * 24;
	
	printf ("%s %ld дней, %ld:%02ld:%02ld\n",label, time/day, (time%day)/hour, (time%hour)/minute, time%minute);
}
