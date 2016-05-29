using System;
using System.Data.Common;
using System.Data.SQLite;

class Program
{
    static void Main(string[] args)
    {
        const string databaseName = @"d:\db\sqlite\lib.sqlite";
        SQLiteConnection connection = 
            new SQLiteConnection(string.Format("Data Source={0};", databaseName));
        connection.Open();
        SQLiteCommand command = new SQLiteCommand("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;", connection);
        SQLiteDataReader reader = command.ExecuteReader();
        foreach (DbDataRecord record in reader)
            Console.WriteLine("Таблица: " + record["name"]);
        connection.Close();
        Console.WriteLine("Готово");
        Console.ReadKey(true);
    }
}
